const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    fileName: {
      type: String,
      required: true
    },
    uploadDate:{
      type: Date,
      default: Date.now
    },
    path: {
      type: String,
      required: true
    },
    valid: {
        type: Boolean,
        default: false
      }
  });

const File = mongoose.model("File", fileSchema);

module.exports = File;