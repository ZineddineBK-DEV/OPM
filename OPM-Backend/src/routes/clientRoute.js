const express = require("express");
const router = express.Router();
const clientController = require('../controllers/clientController');

// client routes
router.get('/all', clientController.getAllClients);
router.get('/get_bay_type_active_compte/:valid', clientController.get_bay_type_active_compte);
router.get('/', clientController.getClientByEmail);
router.put('/updateClient', clientController.updateClient);
router.delete('/', clientController.deleteClient);

module.exports = router;