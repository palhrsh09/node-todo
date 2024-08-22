require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Load MongoDB URI from .env file
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(express.json());

// Routes
app.use('/api/tasks', require('./routes/tasks'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
