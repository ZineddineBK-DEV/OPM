const mongoose = require('mongoose');

const workOrderSchema = new mongoose.Schema({
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
    clientId: { type: mongoose.Schema.Types.ObjectId, required: true },
    listOfTickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }]
  });

const WorkOrder = mongoose.model("WorkOrder", workOrderSchema);

module.exports = WorkOrder;