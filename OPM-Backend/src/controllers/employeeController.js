const Employee = require('../models/employeeModel');

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
      const employee = await Employee.findOne({ email: req.params.email });
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
    const { email, password, authority, image } = req.body;
    const updatedEmployee = await Employee.findOneAndUpdate(
      { email },
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
    const employee = await Employee.findOneAndUpdate(
      { email: req.params.email },
      { valid: false },
      { new: true }
    );
    if (!employee) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted', employee });
  } catch (err) {
    next(err);
  }
};
