


const Employee = require('../models/employeeModel');
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

    let obj = (Employee) (req.body) ;
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
    const employee = await Employee.findOne({ username: req.body.username });
    if (!employee) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isMatch = await bcrypt.compare(req.body.password, employee.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    res.json({ message: 'Login successful', res: employee });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employee = await Employee.find();
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single clinet 
exports.getEmployeeByUsername = async (req, res, next) => {
    try {
      const employee = await Employee.findOne({ username: req.params.username });
      if (!employee) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(employee);
    } catch (err) {
      next(err);
    }
  };

// Update a user still working on it username
exports.updateEmployee = async (req, res) => {
  try {
    const { username, password, authority, image } = req.body;
    const updatedEmployee = await Employee.findOneAndUpdate(
      { username },
      { password, authority, image },
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(updatedEmployee);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

// Delete a employee
exports.deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({ username: req.params.username });
    
    if (!employee) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    await Employee.deleteOne({ username: req.params.username });

    res.status(200).json({ message: 'User deleted', employee });
  } catch (err) {
    next(err);
  }
};
