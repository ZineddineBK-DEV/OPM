const express = require("express");
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// ticket routes
router.post('/createTicket', ticketController.createTicket);
router.get('/all', ticketController.getAllTickets);
router.get('/getTicketById/:id', ticketController.getTicketById);
router.get('/countTicketsByClientId/:id', ticketController.countTicketsByClientId);
router.get('/getTicketByWorkOrderId/:id', ticketController.getTicketByWorkOrderId);
router.get('/getTicketByClientId/:id', ticketController.getTicketByClientId);
router.put('/updateTicket', ticketController.updateTicket);
router.delete('/deleteTicket', ticketController.deleteTicket);

module.exports = router;