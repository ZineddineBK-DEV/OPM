const express = require("express");
const router = express.Router();
const clientController = require('../controllers/clientController');

// client routes
router.get('/all', clientController.getAllClients);
router.get('/', clientController.getClientByEmail);
router.put('/', clientController.updateClient);
router.delete('/', clientController.deleteClient);

module.exports = router;