const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ticketRoutes = require('./routes/ticketRoutes'); // Import routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

mongoose.connect(process.env.MONGODB_URI || 'mongodb://sai:sai123@127.0.0.1:27017/support', {
  connectTimeoutMS: 30000, // Increase timeout to 30 seconds
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit the app if the connection fails
  });

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