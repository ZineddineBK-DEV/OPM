const Ticket = require('../models/ticketModel');

exports.createTicket = async (req, res) => {
  try {
    const ticket = Ticket(req.body);
    await ticket.save();
    res.status(200).json({err: false, message: "Successful operation !", rows: ticket});
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Get all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const ticket = await Ticket.find();
    res.status(200).json({err: false, message: "Successful operation !", rows: ticket});
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Get a single ticket
exports.getTicketById = async (req, res) => {
    try {
      const ticket = await Ticket.findById(req.params.id);
      if (!ticket) {
        return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
      }
      res.status(200).json({err: false, message: "Successful operation !", rows: ticket});
    } catch (err) {
      res.status(500).json({ err: true, message: error.message });
    }
  };

// Update a user still working on it username
exports.updateTicket = async (req, res) => {
  try {
    const { _id, title, clientId, employeeId, workOrderId, status } = req.body;
    const updatedTicket = await Ticket.findByIdAndUpdate(
      { _id },
      { title, clientId, employeeId, workOrderId, status },
      { new: true }
    );
    if (!updatedTicket) {
      return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    res.status(200).json({err: false, message: "Successful operation !", rows: updatedTicket });
  } catch (err) {
    console.error(error);
    res.status(500).json({ err: true, message: error.message });
  }
};

// Delete a ticket
exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.body._id);
    if (!ticket) {
      return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
    }

    res.status(200).json({err: false, message: "Successful operation !", rows: ticket});
  } catch (err) {
    res.status(500).json({ err: true, message: error.message });
  }
};
