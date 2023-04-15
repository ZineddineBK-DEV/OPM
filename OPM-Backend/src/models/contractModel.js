const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
    type: {
      type: String,
      required: true
    },
    startDate:{
      type: Date,
      default: Date.now
    },
    endDate:{
        type: Date,
        required: true
      },
    sla: {
      type: String,
      required: true
    }
  });

const Contract = mongoose.model("Contract", contractSchema);

module.exports = Contract;