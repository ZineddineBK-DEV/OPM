const express = require("express");
const router = express.Router();
const folderController = require('../controllers/folderController');
const upload = require('../middlewares/fileMiddleware');

// folder routes
//router.post('/', folderController.createFolder);
router.post('/add', upload.single('file'), folderController.addFile);
router.post('/remove', folderController.removeFile);
router.get('/all', folderController.getAllFolders);
router.get('/', folderController.getFolderById);
router.put('/', folderController.updateFolder);
router.delete('/', folderController.deleteFolder);

module.exports = router;