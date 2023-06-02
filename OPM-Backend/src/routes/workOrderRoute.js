const express = require("express");
const router = express.Router();
const workOrderController = require('../controllers/workOrderController');
const upload = require('../middlewares/fileMiddleware');

// workorder routes
router.post('/createWorkOrder', upload.single('file'), workOrderController.createWorkOrder);
router.post('/addTicket', upload.array('files'), workOrderController.addTicket);
router.post('/removeTicket', workOrderController.removeTicket);
router.get('/all', workOrderController.getAllWorkOrders);
router.get('/getWorkOrderById/:id/:authority', workOrderController.getWorkOrderById);
router.get('/getWorkOrderByStatus/:id/:status', workOrderController.getWorkOrderByStatus);

router.get('/countWorkOrderByClientId/:id', workOrderController.countWorkOrderByClientId);
router.get('/getWorkOrderByClientId/:id', workOrderController.getWorkOrderByClientId);
router.get('/getWorkOrderByEmployeeId/:id', workOrderController.getWorkOrderByEmployeeId);




// for stat bay clt w tech

router.get('/getWorkOrderByClientIdByStatus/:id/:status', workOrderController.getWorkOrderByClientIdByStatus);
router.get('/getWorkOrderByEmployeeIdByStatus/:id/:status', workOrderController.getWorkOrderByEmployeeIdByStatus);







router.put('/updateWorkOrder', workOrderController.updateWorkOrder);
router.post('/uploadLogo', upload.single('file'), workOrderController.uploadLogo);
router.delete('/deleteWorkOrder/:id', workOrderController.deleteWorkOrder);

module.exports = router;