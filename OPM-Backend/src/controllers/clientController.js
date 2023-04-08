const Client = require('../models/clientModel');

// Get all clients
exports.getAllClients = async (req, res) => {
  try {
    const client = await Client.find();
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single clinet 
exports.getClientByUsername = async (req, res, next) => {
    try {
      const client = await Client.findOne({ email: req.params.email });
      if (!client) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(client);
    } catch (err) {
      next(err);
    }
  };

// Update a user still working on it username
exports.updateClient = async (req, res) => {
  try {
    const { email, password, authority, image } = req.body;
    const updatedClient = await Client.findOneAndUpdate(
      { email },
      { password, authority, image },
      { new: true }
    );
    if (!updatedClient) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(updatedClient);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

// Delete a client
exports.deleteClient = async (req, res, next) => {
  try {
    const client = await Client.findOneAndUpdate(
      { email: req.params.email },
      { password, authority, image },
      { new: true }
    );
    if (!client) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted', client });
  } catch (err) {
    next(err);
  }
};
