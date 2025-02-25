const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Person = require('./models/person'); // Import Mongoose model
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// ✅ GET All Persons from MongoDB
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons);
  });
});

// ✅ POST - Add New Person
app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: 'Name and number are required' });
  }

  const person = new Person({ name, number });
  person.save()
    .then(savedPerson => res.json(savedPerson))
    .catch(error => res.status(500).json({ error: error.message }));
});

// ✅ GET Single Person by ID
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => person ? res.json(person) : res.status(404).end())
    .catch(error => next(error));
});

// ✅ DELETE a Person
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(error => next(error));
});

// ✅ PUT - Update a Person's Number
app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;
  const updatedPerson = { name, number };

  Person.findByIdAndUpdate(req.params.id, updatedPerson, { new: true })
    .then(updated => res.json(updated))
    .catch(error => next(error));
});

// ✅ Middleware for Unknown Routes
app.use((req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' });
});

// ✅ Error Handling Middleware
app.use((error, req, res, next) => {
  console.error(error.message);
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'Malformatted ID' });
  }
  next(error);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
