const express = require("express");
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// ticket routes
router.post('/createTicket', ticketController.createTicket);
router.get('/all', ticketController.getAllTickets);
router.get('/:id', ticketController.getTicketById);
router.put('/updateTicket', ticketController.updateTicket);
router.delete('/deleteTicket', ticketController.deleteTicket);

module.exports = router;