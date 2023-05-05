const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    creationDate:{
      type: Date,
      default: Date.now
    },
    title: {
      type: String,
      required: true
    },
    status: {
        type: String,
        enum: ['In progress', 'Done'],
        default: 'In progress'
      },
    clientId: { type: mongoose.Schema.Types.ObjectId, required: true },
    employeeId: { type: mongoose.Schema.Types.ObjectId, default: 'none' },
    workOrderId: { type: mongoose.Schema.Types.ObjectId, required: true },
  });

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;