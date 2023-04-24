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
// Get all employees by authority
exports.getAllEmployeesByAuthority = async (req, res) => {
  const { authority } = req.body
  try {
    const employee = await Employee.find({ authority });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single clinet 
exports.getEmployeeByEmail = async (req, res, next) => {
    try {
      const employee = await Employee.findOne({ email: req.body.email });
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
    const { email, password, firstName, lastName, birthDate, image, newEmail } = req.body;
    const updatedEmployee = await Employee.findOneAndUpdate(
      { email },
      { email: newEmail, password, firstName, lastName, birthDate, image },
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
      { email: req.body.email },
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
