const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database config
const dbConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Server startup
const startServer = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/memebuilder',
      dbConfig
    );
    console.log('MongoDB connected successfully');

    // Routes
    app.use('/api/domains', require('./routes/domains'));
    app.use('/api/deploy', require('./routes/deploy'));

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Server startup failed:', err);
};

startServer();