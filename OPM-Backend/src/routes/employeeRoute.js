const express = require("express");
const router = express.Router();
const employeeController = require('../controllers/employeeController');

//employee routes
router.post('/register', employeeController.register);
router.post('/login', employeeController.login);
router.get('/all', employeeController.getAllEmployees);
router.get('/:username', employeeController.getEmployeeByUsername);
router.patch('/:id', employeeController.updateEmployee);
router.delete('/:username', employeeController.deleteEmployee);

module.exports = router;