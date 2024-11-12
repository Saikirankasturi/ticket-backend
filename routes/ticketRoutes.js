const express = require('express');
const Ticket = require('../models/Ticket');
const router = express.Router();

// 1. Fetch all tickets
router.get('/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find(); // Fetch all tickets from the database
    res.status(200).json(tickets); // Send tickets as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching tickets' }); // Handle any error
  }
});

// 2. Submit a new ticket
router.post('/tickets', async (req, res) => {
  const { name, email, description, category } = req.body;

  // Basic validation
  if (!name || !email || !description || !category) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newTicket = new Ticket({
      name,
      email,
      description,
      category,
      status: 'Pending', // Default status can be 'Pending'
    });

    const savedTicket = await newTicket.save(); // Save ticket to DB
    res.status(201).json(savedTicket); // Send the saved ticket back in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting ticket' });
  }
});

// 3. Fetch a specific ticket by ID (optional, for future expansion)
router.get('/tickets/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await Ticket.findById(id); // Fetch a single ticket by ID
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.status(200).json(ticket); // Send ticket as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching ticket' });
  }
});

module.exports = router;
