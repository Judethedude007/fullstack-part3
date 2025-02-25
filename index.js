const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
];

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

app.get('/info', (req, res) => {
  const numberOfEntries = persons.length;
  const requestTime = new Date();
  res.send(`
    <p>Phonebook has info for ${numberOfEntries} people</p>
    <p>${requestTime}</p>
  `);
});

app.get('/api/persons', (req, res) => {
  console.log('Returning persons:', persons); // Add this line
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find(p => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).send({ error: 'Person not found' });
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  persons = persons.filter(p => p.id !== id);
  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: 'Name or number is missing' });
  }

  const existingPerson = persons.find(p => p.name === name);
  if (existingPerson) {
    return res.status(400).json({ error: 'Name must be unique' });
  }

  const id = Math.floor(Math.random() * 1000000).toString();
  const newPerson = { id, name, number };
  persons = persons.concat(newPerson);

  res.json(newPerson);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

const PORT = process.env.PORT || 3001; // Use the port provided by Render
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
