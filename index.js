const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config(); // Ensure this line is present

const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

app.get('/info', (req, res) => {
  Person.countDocuments({}).then(count => {
    const requestTime = new Date();
    res.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${requestTime}</p>
    `);
  });
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons);
  });
});

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person);
    } else {
      res.status(404).send({ error: 'Person not found' });
    }
  }).catch(error => {
    res.status(400).send({ error: 'Malformatted id' });
  });
});

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id).then(() => {
    res.status(204).end();
  }).catch(error => {
    res.status(400).send({ error: 'Malformatted id' });
  });
});

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: 'Name or number is missing' });
  }

  const person = new Person({
    name,
    number,
  });

  person.save().then(savedPerson => {
    res.json(savedPerson);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

const PORT = process.env.PORT || 3002; // Use the port provided by the .env file
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
