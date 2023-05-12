const mongoose = require('mongoose');

const followUpSchema = new mongoose.Schema({
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
    workOrderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref:'WorkOrder' },
  });

const FollowUp = mongoose.model("FollowUp", followUpSchema);

module.exports = FollowUp;