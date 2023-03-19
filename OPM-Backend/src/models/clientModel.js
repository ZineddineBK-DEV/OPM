const mongoose = require('mongoose');
const User = require('./userModel')

const clientSchema = new mongoose.Schema({
    company: {
      type: String,
      required: true
    },
    contract: {
      type: String,
      required: true
    }
  });
  
  const Client = User.discriminator('Client', clientSchema);

  module.exports = Client;