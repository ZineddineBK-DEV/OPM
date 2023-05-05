const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
    creationDate:{
      type: Date,
      default: Date.now
    },
    name: {
      type: String,
      required: true
    },
    contractId: { type: mongoose.Schema.Types.ObjectId, required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, required: true },
    listOfFiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }]
  });

const Folder = mongoose.model("Folder", folderSchema);

module.exports = Folder;