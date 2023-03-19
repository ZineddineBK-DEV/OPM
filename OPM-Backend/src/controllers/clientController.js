const Client = require('../models/clientModel');
const User = require('../models/userModel')
const bcrypt = require('bcrypt');

//register
exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    let obj = (Client) (req.body) ;
    obj.password = hashedPassword;
    await obj.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
};


// Login
exports.login = async (req, res) => {
  try {
    const client = await User.findOne({ username: req.body.username });
    if (!client) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isMatch = await bcrypt.compare(req.body.password, client.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    res.json({ message: 'Login successful', res: client });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
      const client = await Client.findOne({ username: req.params.username });
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
    const { username, password, authority, image } = req.body;
    const updatedClient = await Client.findOneAndUpdate(
      { username },
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
    const client = await Client.findOne({ username: req.params.username });
    
    if (!client) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    await Client.deleteOne({ username: req.params.username });

    res.status(200).json({ message: 'User deleted', client });
  } catch (err) {
    next(err);
  }
};
