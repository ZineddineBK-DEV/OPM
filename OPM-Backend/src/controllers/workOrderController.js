const WorkOrder = require('../models/workOrderModel');
const Ticket = require('../models/ticketModel');
const File = require('../models/fileModel');


exports.createWorkOrder = async (req, res) => {
  try {
    var workOrder = WorkOrder(req.body);
    if (req.file){
    const newFile = File({
      fileName: req.file.filename,
      path: req.file.destination + '/' + req.file.filename,
      title: req.body.title
    });
    await newFile.save();
    await workOrder.save();
    workOrder = await WorkOrder.findByIdAndUpdate(
      workOrder._id,
      {logo: newFile},
      {new: true}
    );}
    res.status(200).json({err: false, message: "Successful operation !", rows: workOrder});
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Add ticket to the workorder
exports.addTicket = async (req, res) => {
  const { title, clientId, description, employeeId } = req.body;
  try {
   const ticket = Ticket({ title, description, employeeId });
   await ticket.save();
   const workOrder = await WorkOrder.findOneAndUpdate(
     { clientId: clientId },
     { $push: { listOfTickets: ticket } },
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
    { $pull: { listOfTickets: ticketId } },
    { new: true }
   );
   res.status(200).json({ err: false, message: "Successful operation !", rows: workOrder });
 } catch (error) {
   res.status(500).json({ err: true, message: error.message });
 }
};

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
    try {
      const workOrder = await WorkOrder.findById(req.params.id);
      if (!workOrder) {
        return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
      }
      res.status(200).json({err: false, message: "Successful operation !", rows: workOrder});
    } catch (error) {
      res.status(500).json({ err: true, message: error.message });
    }
  };

  // Get a workOrder by status
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
};

    // Get a work order by client id
exports.getWorkOrderByClientId = async (req, res) => {
  const clientId = req.params.id;
  try {
    const workOrder = await WorkOrder.find({ clientId }).populate(
      [
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
          path: 'listOfTickets',
          model: 'Ticket',
          select: 'title status creationDate'
        },
      ]);
    if (!workOrder) {
      return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    res.status(200).json({err: false, message: "Successful operation !", rows: workOrder});
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

// upload logo
exports.uploadLogo = async (req, res) => {
  try { 
    const newFile = File({
      fileName: req.file.filename,
      path: req.file.destination + '/' + req.file.filename,
      title: req.body.title
    });
    await newFile.save();
    const workOrder = await WorkOrder.findByIdAndUpdate(
      req.body.workOrderId,
      {logo: newFile},
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
  try {
    const id_worek_order = req.params.id_worek_order;
    const workOrder = await WorkOrder.findByIdAndDelete(id_worek_order);
    if (!workOrder) {
      return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
    }

    res.status(200).json({err: false, message: "Successful operation !", rows: workOrder});
  } catch (err) {
    res.status(500).json({ err: true, message: error.message });
  }
};
