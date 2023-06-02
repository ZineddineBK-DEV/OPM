const WorkOrder = require('../models/workOrderModel');
const Ticket = require('../models/ticketModel');
const File = require('../models/fileModel');
const checkSLA = require('../middlewares/SLAcheck');


exports.createWorkOrder = async (req, res) => {
  try {
    var workOrder = WorkOrder(req.body);
    if (req.files){
      const files = req.files; // Get the array of uploaded files
      const uploadedFiles = [];
  
      for (const file of files) {
        const newFile = File({
          fileName: file.filename,
          path: file.destination + '/' + file.filename,
          title: file.orignalname
        });
        await newFile.save();
        uploadedFiles.push(newFile);
      }
    workOrder.listOfFiles=uploadedFiles;
    }
    await workOrder.save();
    res.status(200).json({err: false, message: "Successful operation !", rows: workOrder});
    checkSLA(req.body.clientId);
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Add ticket to the workorder
exports.addTicket = async (req, res) => {
  const { title, clientId, description, employeeId, workOrderId } = req.body;
  try {

    const files = req.files; // Get the array of uploaded files
    const uploadedFiles = [];

    for (const file of files) {
      const newFile = File({
        fileName: file.filename,
        path: file.destination + '/' + file.filename,
        title: file.orignalname
      });
      await newFile.save();
      uploadedFiles.push(newFile);
    }
   const ticket = Ticket({ title, description, employeeId, listOfFiles: uploadedFiles});
   await ticket.save();
   const workOrder = await WorkOrder.findOneAndUpdate(
     { _id: workOrderId },
     { ticketId: ticket._id },
     { new: true }
    );
    res.status(200).json({ err: false, message: "Successful operation !", rows: workOrder });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};
// remove ticket to the workorder
exports.removeTicket = async (req, res) => {
  const { ticketId, clientId } = req.body;
 try {
  const ticket = await Ticket.findByIdAndDelete(ticketId);
  if (!ticket){
   return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
  }
  const workOrder = await WorkOrder.findOneAndUpdate(
    { clientId: clientId },
    { ticketId: null },
    { new: true }
   );
   res.status(200).json({ err: false, message: "Successful operation !", rows: workOrder });
 } catch (error) {
   res.status(500).json({ err: true, message: error.message });
 }
};
exports.getWorkOrderByStatus = async (req, res) => {
  const clientId = req.params.id;
  const status = req.params.status;

  try {
    if (!status) {
      return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    const workOrder = await WorkOrder.find({clientId, status});
    if (!workOrder) {
      return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    res.status(200).json({err: false, message: "Successful operation !", rows: workOrder});
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
}
// Get all workOrders
exports.getAllWorkOrders = async (req, res) => {
  try {
    const workOrder = await WorkOrder.find();
    res.status(200).json({err: false, message: "Successful operation !", rows: workOrder});
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Get a single workOrder
exports.getWorkOrderById = async (req, res) => {
  const id = req.params.id;
    try {
      if (req.params.authority && req.params.authority == "client"){
        const workOrder = await WorkOrder.findById(id).populate(
          [
            {
              path: 'listOfFiles',
              model: 'File',
            },
            {
              path: 'clientId',
              model: 'Client',
              select: 'company',
            },
            {
              path: 'employeeId',
              model: 'Employee',
              select: 'firstName lastName'
            },
          ]).select('-listOfTickets');
          if (!workOrder) {
            return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
          }
          
      res.status(200).json({err: false, message: "Successful operation !", rows: workOrder});
      }else{
        const workOrder = await WorkOrder.findById(id).populate(
          [
            {
              path: 'listOfFiles',
              model: 'File',
            },
            {
              path: 'clientId',
              model: 'Client',
              select: 'company',
            },
            {
              path: 'employeeId',
              model: 'Employee',
              select: 'firstName lastName'
            },
            {
              path: 'ticketId',
              model: 'Ticket',
              select: 'title status creationDate description',
              populate:{
                path: 'listOfFiles',
                model: 'File'
              }
            },
          ]);
          if (!workOrder) {
            return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
          }
      res.status(200).json({err: false, message: "Successful operation !", rows: workOrder});
        }
    } catch (error) {
      res.status(500).json({ err: true, message: error.message });
    }
  };

// Get a workOrders affected to a technician
exports.getWorkOrderByEmployeeId = async (req, res) => {
  const id = req.params.id;
  try {
    const workOrder = await WorkOrder.find({ employeeId: id}).populate(
      [
        {
          path: 'listOfFiles',
          model: 'File',
        },
        {
          path: 'clientId',
          model: 'Client',
          select: 'company',
        },
        {
          path: 'employeeId',
          model: 'Employee',
          select: 'firstName lastName'
        },
        {
          path: 'ticketId',
          model: 'Ticket',
          select: 'title status creationDate description',
          populate: {
            path: 'listOfFiles',
            model: 'File'
          }
        },
      ]);
    if (!workOrder) {
      return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    res.status(200).json({ err: false, message: "Successful operation !", rows: workOrder });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

  // Get a workOrder by status for a certain client
exports.getWorkOrderByClientIdByStatus = async (req, res) => {
  const clientId = req.params.id;
  const status = req.params.status;
  try {
    if (!status) {
      return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    const workOrder = await WorkOrder.find({clientId, status});
    if (!workOrder) {
      return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    res.status(200).json({err: false, message: "Successful operation !", rows: workOrder});
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

  // Get a workOrder by status for a certain employee
  exports.getWorkOrderByEmployeeIdByStatus = async (req, res) => {
    const employeeId = req.params.id;
    const status = req.params.status;
  
    try {
      if (!status) {
        return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
      }
      const workOrder = await WorkOrder.find({employeeId, status});
      if (!workOrder) {
        return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
      }
      res.status(200).json({err: false, message: "Successful operation !", rows: workOrder});
    } catch (error) {
      res.status(500).json({ err: true, message: error.message });
    }
  };
  

    // Get a work order by client id
exports.getWorkOrderByClientId = async (req, res) => {
  const clientId = req.params.id;
  try {
    if (req.body.authority && req.body.authority == "client"){
      const workOrder = await WorkOrder.find({ clientId }).populate(
        [
          {
            path: 'listOfFiles',
            model: 'File'
          },
          {
            path: 'clientId',
            model: 'Client',
            select: 'company',
          },
          {
            path: 'employeeId',
            model: 'Employee',
            select: 'firstName lastName'
          },
        ]).select('-listOfTickets');
        if (!workOrder) {
          return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
        }
        
    res.status(200).json({err: false, message: "Successful operation !", rows: workOrder});
    }else{
      const workOrder = await WorkOrder.find({ clientId }).populate(
        [
          {
            path: 'listOfFiles',
            model: 'File'
          },
          {
            path: 'clientId',
            model: 'Client',
            select: 'company',
          },
          {
            path: 'employeeId',
            model: 'Employee',
            select: 'firstName lastName'
          },
          {
            path: 'ticketId',
            model: 'Ticket',
            select: 'title status creationDate',
            populate:{
              path: 'listOfFiles',
              model: 'File'
            }
          },
        ]);
        if (!workOrder) {
          return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
        }
        
    res.status(200).json({err: false, message: "Successful operation !", rows: workOrder});
    }
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

  exports.countWorkOrderByClientId = async (req, res) => {
    const clientId = req.params.id;
    try {
      const count = await WorkOrder.countDocuments({ clientId });
      res.status(200).json({err: false, message: "Successful operation !", rows: {count, clientId} });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: true, message: error.message });
    }
  };

// returns un handled workOrders
exports.getUnhandledWorkOrders = async (req, res) => {
  const clientId = req.params.id;
  try {
    if (clientId) {
      const workOrder = await WorkOrder.find({
        clientId: clientId,
        $or: [
          { employeeId: null }, // Check if employeeId is null
          { employeeId: { $exists: false } } // Check if employeeId does not exist
        ]
      }).populate(
        [
          {
            path: 'listOfFiles',
            model: 'File',
          },
          {
            path: 'clientId',
            model: 'Client',
            select: 'company',
          },
          {
            path: 'employeeId',
            model: 'Employee',
            select: 'firstName lastName'
          },
          {
            path: 'ticketId',
            model: 'Ticket',
            select: 'title status creationDate description',
            populate: {
              path: 'listOfFiles',
              model: 'File'
            }
          },
        ]);
      if (!workOrder) {
        return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
      }

      res.status(200).json({ err: false, message: "Successful operation !", rows: workOrder });
    } else {
      const workOrder = await WorkOrder.find({
        $or: [
          { employeeId: null }, // Check if employeeId is null
          { employeeId: { $exists: false } } // Check if employeeId does not exist
        ]
      }).populate(
        [
          {
            path: 'listOfFiles',
            model: 'File',
          },
          {
            path: 'clientId',
            model: 'Client',
            select: 'company',
          },
          {
            path: 'employeeId',
            model: 'Employee',
            select: 'firstName lastName'
          },
          {
            path: 'ticketId',
            model: 'Ticket',
            select: 'title status creationDate description',
            populate: {
              path: 'listOfFiles',
              model: 'File'
            }
          },
        ]);
      if (!workOrder) {
        return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
      }

      res.status(200).json({ err: false, message: "Successful operation !", rows: workOrder });
    }

  } catch (error) {

  }
};

// upload files
exports.uploadFiles = async (req, res) => {
  try { 
    const files = req.files; // Get the array of uploaded files
    const uploadedFiles = [];

    for (const file of files) {
      const newFile = File({
        fileName: file.filename,
        path: file.destination + '/' + file.filename,
        title: req.body.title
      });
      await newFile.save();
      uploadedFiles.push(newFile);
    }
    const workOrder = await WorkOrder.findByIdAndUpdate(
      req.body.workOrderId,
      { $push: { listOfFiles: uploadedFiles } },
      {new: true}
    );   
    res.status(200).json({err: false, message: "Successful operation !", rows: workOrder}); 
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Update a user still working on it username
exports.updateWorkOrder = async (req, res) => {
  try {
    const { 
      _id, title, clientId, status, description, employeeId, partName, partNum, serialNum, logo 
    } = req.body;
    const updatedWorkOrder = await WorkOrder.findByIdAndUpdate(
      { _id },
      { title, clientId, status, description, employeeId, partName, partNum, serialNum, logo },
      { new: true }
    );
    if (!updatedWorkOrder) {
      return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    res.status(200).json({err: false, message: "Successful operation !", rows: updatedWorkOrder });
  } catch (err) {
    console.error(error);
    res.status(500).json({ err: true, message: error.message });
  }
};

// Delete a workOrder
exports.deleteWorkOrder = async (req, res) => {
  const workOrderId = req.params.id;
  try {
    const workOrder = await WorkOrder.findByIdAndDelete(workOrderId);
    if (!workOrder) {
      return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
    }

    res.status(200).json({err: false, message: "Successful operation !", rows: workOrder});
  } catch (err) {
    res.status(500).json({ err: true, message: error.message });
  }
};
