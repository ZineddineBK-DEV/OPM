const express = require("express");
const router = express.Router();
const fileController = require('../controllers/fileController');

// file routes
router.post('/', fileController.createFile);
router.get('/all', fileController.getAllFiles);
router.get('/', fileController.getFileById);
router.patch('/', fileController.updateFile);
router.delete('/', fileController.deleteFile);

module.exports = router;