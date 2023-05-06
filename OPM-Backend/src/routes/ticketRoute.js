const express = require("express");
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// ticket routes
router.post('/createTicket', ticketController.createTicket);
router.get('/all', ticketController.getAllTickets);
router.get('/:id', ticketController.getTicketById);
router.get('/countTicketsByClientId/:id', ticketController.countTicketsByClientId);
router.get('/getTicketByWorkOrderId/:id', ticketController.getTicketByWorkOrderId);
router.put('/updateTicket', ticketController.updateTicket);
router.delete('/deleteTicket', ticketController.deleteTicket);

module.exports = router;