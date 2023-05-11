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
        enum: ['In progress', 'Done', 'Expired'],
        default: 'In progress'
      },
    clientId: { type: mongoose.Schema.Types.ObjectId, required: true, ref:'Client' },
    employeeId: { type: mongoose.Schema.Types.ObjectId, default: 'none', ref:'Employee' },
    workOrderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref:'WorkOrder' },
  });

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;