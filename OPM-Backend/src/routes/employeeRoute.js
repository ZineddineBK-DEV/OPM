const express = require("express");
const router = express.Router();
const employeeController = require('../controllers/employeeController');

//employee routes
router.get('/all', employeeController.getAllEmployees);
router.get('/getAllEmployeesByAuthority', employeeController.getAllEmployeesByAuthority);
router.get('/getEmployeeByEmail', employeeController.getEmployeeByEmail);
router.patch('/updateEmployee', employeeController.updateEmployee);
router.delete('/deleteEmployee', employeeController.deleteEmployee);

module.exports = router;