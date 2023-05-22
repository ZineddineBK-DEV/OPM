const mongoose = require('mongoose');

const workOrderSchema = new mongoose.Schema({
    creationDate:{
      type: Date,
      default: Date.now
    },
    finishDate:{
      type: Date
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    partName: {
      type: String
    },
    partNum: {
      type: String
    },
    serialNum: {
      type: String
    },
    logo: { type: mongoose.Schema.Types.ObjectId, ref:'File' },
    status: {
      type: String,
      enum: ['In progress', 'Done', 'Expired'],
      default: 'In progress'
    },
    clientId: { type: mongoose.Schema.Types.ObjectId, required: true, ref:'Client' },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref:'Employee' },
    ticketId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }
  });

const WorkOrder = mongoose.model("WorkOrder", workOrderSchema);

module.exports = WorkOrder;