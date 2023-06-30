const express = require('express');
const router = express.Router();
const partOrderController = require('../controllers/partOrderController');


router.post('/createPartOrder', partOrderController.createPartOrder);
router.get('/all', partOrderController.getAllPartOrders);
router.get('/getPartOrderById/:id', partOrderController.getPartOrderById);
router.post('/updatePartOrder/:id', partOrderController.updatePartOrder);
router.delete('/deletePartOrder/:id', partOrderController.deletePartOrder);

module.exports = router;
