const express = require("express");
const router = express.Router();
const followUpController = require('../controllers/followUpController');

// followUp routes
router.post('/createFollowUp', followUpController.createFollowUp);
router.get('/all', followUpController.getAllFollowUps);
router.get('/:id', followUpController.getFollowUpById);
router.put('/updateFollowUp', followUpController.updateFollowUp);
router.delete('/deleteFollowUp', followUpController.deleteFollowUp);

module.exports = router;