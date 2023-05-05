const express = require("express");
const router = express.Router();
const workOrderController = require('../controllers/workOrderController');

// workorder routes
router.post('/createWorkOrder', workOrderController.createWorkOrder);
router.post('/addTicket', workOrderController.addTicket);
router.post('/removeTicket', workOrderController.removeTicket);
router.get('/all', workOrderController.getAllWorkOrders);
router.get('/:id', workOrderController.getWorkOrderById);
router.put('/updateWorkOrder', workOrderController.updateWorkOrder);
router.delete('/deleteWorkOrder', workOrderController.deleteWorkOrder);

module.exports = router;