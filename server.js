const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ticketRoutes = require('./routes/ticketRoutes'); // Import routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/support', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api', ticketRoutes); // Prefix '/api' for all ticket-related routes

// Test route
app.get('/', (req, res) => {
  res.send("Welcome to the Support Ticket API");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error Stack:', err.stack); // Log full error stack for more info
  res.status(500).json({ message: err.message || 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));