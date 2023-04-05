const express = require("express");
const router = express.Router();
const clientController = require('../controllers/clientController');

// client routes
router.get('/all', clientController.getAllClients);
router.get('/:username', clientController.getClientByUsername);
router.patch('/:id', clientController.updateClient);
router.delete('/:username', clientController.deleteClient);

module.exports = router;