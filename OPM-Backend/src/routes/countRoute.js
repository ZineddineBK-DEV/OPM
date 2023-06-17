const express = require("express");
const router = express.Router();
const countController = require('../controllers/countController');

router.get('/countUnhandledWorkOrderByClientId/:clientId/:status?', countController.countUnhandledWorkOrderByClientId);
router.get('/countUsersByAuthority/:authority', countController.countUsersByAuthority);
router.get('/countContracts/', countController.countContracts);
router.get('/countEmployees/', countController.countEmployees);
router.get('/countWorkOrderByEmployeeId/:employeeId/:status?', countController.countWorkOrderByEmployeeId);
router.get('/countTicketsByEmployeeId/:employeeId?', countController.countTicketsByEmployeeId);






module.exports = router;