const mongoose = require('mongoose');

// Load environment variables
require('dotenv').config();

const url = process.env.MONGO_URL;
console.log('Connecting to MongoDB...');

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error.message));

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true }
});

// Convert `_id` to `id` and remove `__v`
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);
