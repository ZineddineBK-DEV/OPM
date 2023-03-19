const express = require("express");
const router = express.Router();
const testCtr = require("../controllers/controller");
const userController = require('../controllers/userController');
const clientController = require('../controllers/clientController');
const employeeController = require('../controllers/employeeController');

//test
router.get("/testMessage", testCtr.test);

// user routes
router.post('/register/user', userController.register);
router.post('/login/user', userController.login);
router.get('/users', userController.getAllUsers);
router.get('/user/:username', userController.getUserByUsername);
router.patch('/user/:id', userController.updateUser);
router.delete('/user/:username', userController.deleteUser);
// client routes
router.post('/register/client', clientController.register);
router.post('/login/client', clientController.login);
router.get('/clients', clientController.getAllClients);
router.get('/client/:username', clientController.getClientByUsername);
router.patch('/client/:id', clientController.updateClient);
router.delete('/client/:username', clientController.deleteClient);
//employee routes
router.post('/register/employee', employeeController.register);
router.post('/login/employee', employeeController.login);
router.get('/employees', employeeController.getAllEmployees);
router.get('/employee/:username', employeeController.getEmployeeByUsername);
router.patch('/employee/:id', employeeController.updateEmployee);
router.delete('/employee/:username', employeeController.deleteEmployee);

module.exports = router;
