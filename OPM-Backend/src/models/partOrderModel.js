const mongoose = require('mongoose');

const partOrderSchema = new mongoose.Schema({
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
    status: {
      type: String,
      enum: ['In progress', 'Done','Valid' , 'Expired'],
      default: 'In progress'
    },
    signedBy: {
      type: String
    },
    clientId: { type: mongoose.Schema.Types.ObjectId, required: true, ref:'Client' },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref:'Employee' },
    listOfFiles: [{ type: mongoose.Schema.Types.ObjectId, ref:'File' }],
  });

const PartOrder = mongoose.model("PartOrder", partOrderSchema);

module.exports = PartOrder;