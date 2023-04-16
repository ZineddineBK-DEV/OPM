const express = require("express");
const router = express.Router();
const employeeController = require('../controllers/employeeController');

//employee routes
router.get('/all', employeeController.getAllEmployees);
router.get('/', employeeController.getEmployeeByEmail);
router.patch('/', employeeController.updateEmployee);
router.delete('/', employeeController.deleteEmployee);

module.exports = router;