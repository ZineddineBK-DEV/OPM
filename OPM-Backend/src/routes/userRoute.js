const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');

// user routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/all', userController.getAllUsers);
router.get('/:username', userController.getUserByUsername);
router.patch('/:id', userController.updateUser);
router.delete('/:username', userController.deleteUser);

module.exports = router;