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
    fileId: { type: mongoose.Schema.Types.ObjectId, default: null, ref:'File' }
  });

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;