const express = require("express");
const router = express.Router();
const contractController = require('../controllers/contractController');

// contract routes
router.get('/all', contractController.getAllContracts);
router.get('/', contractController.getContractById);
router.patch('/', contractController.updateContract);
router.delete('/', contractController.deleteContract);

module.exports = router;