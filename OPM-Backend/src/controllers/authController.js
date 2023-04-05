const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Client = require('../models/clientModel');
const Employee = require('../models/employeeModel');
const tokenGen = require("../middlewares/tokenMiddleware");

exports.register = async (req, res) => {
  const { username, password, authority } = req.body;
  let Model;
  switch (authority) {
    case 'client':
      Model = Client;
      break;
    case 'commercial':
      Model = Employee;
      break;
    case 'technician':
      Model = Employee;
      break;
    default:
      return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const userExists = await Model.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    let obj = (Model) (req.body) ;
    obj.password = hashedPassword;
    await obj.save();

    res.status(201).json({ message: 'User created successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

exports.login = async (req, res) => {
  const { username, password, authority } = req.body;
  let Model;
  switch (authority) {
    case 'client':
      Model = Client;
      break;
    case 'commercial':
      Model = Employee;
      break;
    case 'technician':
      Model = Employee;
      break;
    default:
      return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const user = await Model.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const { accessToken } = await tokenGen.generateToken(user);
    res.setHeader('Authorization', `Bearer ${accessToken}`);
    //res.setHeader('Refresh-Token', refreshToken);
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

exports.verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { tokenDetails, message, error } = await tokenGen.verifyToken(token);
    res.status(200).json({ tokenDetails, message, error });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};


exports.verify = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { tokenDetails, message ,error } = await tokenGen.verifyToken(token);
    if(error){
      res.status(500).json({ message: message });
      return;
    }
    res.setHeader('Authorization', `Bearer ${tokenDetails.AccessToken}`);
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { message, error } = await tokenGen.deleteToken(token);
    res.status(200).json({ message, error });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};