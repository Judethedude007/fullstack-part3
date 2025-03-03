require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const Person = require('./models/person'); // Import the Mongoose model

const app = express();

// ✅ Middleware Setup
app.use(express.json()); // Allows JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(morgan('tiny')); // Log HTTP requests

// ✅ Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// ✅ Log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`📩 Incoming Request: ${req.method} ${req.path}`);
  next();
});

// ✅ Load environment variables
const PORT = process.env.PORT || 3003; // Ensure this matches the frontend
const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  console.error('❌ MONGO_URL is not set in .env file');
  process.exit(1);
}

// ✅ Connect to MongoDB
mongoose.connect(MONGO_URL)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(error => {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit if DB connection fails
  });

// ✅ GET - Fetch All Persons
app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(persons => res.json(persons))
    .catch(error => {
      console.error('❌ Error fetching persons:', error);
      res.status(500).json({ error: 'Database error' });
    });
});

// ✅ POST - Add a New Person
app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: 'Name and number are required' });
  }

  Person.findOne({ name })
    .then(existingPerson => {
      if (existingPerson) {
        // Update the existing person's number
        existingPerson.number = number;
        return existingPerson.save();
      } else {
        // Create a new person
        const person = new Person({ name, number });
        return person.save();
      }
    })
    .then(savedPerson => res.status(201).json(savedPerson))
    .catch(error => next(error));
});

// ✅ GET - Fetch a Single Person by ID
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => person ? res.json(person) : res.status(404).json({ error: 'Person not found' }))
    .catch(error => next(error));
});

// ✅ DELETE - Remove a Person (Updated)
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(deletedPerson => {
      if (!deletedPerson) {
        return res.status(404).json({ error: 'Person not found' });
      }
      res.status(204).end();
    })
    .catch(error => next(error));
});

// ✅ PUT - Update a Person's Number
app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: 'Name and number are required' });
  }

  const updatedPerson = { name, number };

  Person.findByIdAndUpdate(req.params.id, updatedPerson, { new: true, runValidators: true, context: 'query' })
    .then(updated => res.json(updated))
    .catch(error => next(error));
});

// ✅ GET - Info Route
app.get('/info', (req, res) => {
  Person.countDocuments({})
    .then(count => {
      res.send(`<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`);
    })
    .catch(error => {
      console.error('❌ Error fetching info:', error);
      res.status(500).json({ error: 'Database error' });
    });
});

// ✅ Middleware for Unknown Routes
app.use((req, res) => {
  res.status(404).json({ error: 'Unknown endpoint' });
});

// ✅ Error Handling Middleware
app.use((error, req, res, next) => {
  console.error('❌ Error:', error.message);
  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'Malformatted ID' });
  }
  next(error);
});

// ✅ Error Handler Middleware
app.use((error, req, res, next) => {
  console.error('❌ Error:', error.message);
  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'Malformatted ID' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  next(error);
});

// ✅ Serve the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// ✅ Start the Server
const startServer = (port) => {
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️ Port ${port} is in use, trying port ${port + 1}`);
      startServer(port + 1);
    } else {
      console.error('❌ Server error:', err);
    }
  });
};

startServer(PORT);
