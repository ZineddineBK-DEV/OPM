const express = require("express");
const router = express.Router();
const contractController = require('../controllers/contractController');

// contract routes
router.post('/createContract', contractController.createContract);
router.get('/all', contractController.getAllContracts);
router.get('/:id', contractController.getContractById);
router.put('updateContract', contractController.updateContract);
router.delete('/', contractController.deleteContract);

module.exports = router;
