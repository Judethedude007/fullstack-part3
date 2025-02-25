import React, { useState, useEffect } from 'react';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    personsService.getAll().then(initialPersons => {
      console.log('Fetched persons:', initialPersons);
      if (Array.isArray(initialPersons)) {
        setPersons(initialPersons);
      } else {
        console.error('Expected an array but got:', initialPersons);
      }
    }).catch(error => {
      console.error('Error fetching persons:', error);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    personsService.create(personObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
    }).catch(error => {
      console.error('Error adding person:', error);
    });
  };

  const deletePerson = (id) => {
    if (window.confirm('Do you really want to delete this person?')) {
      personsService.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id));
      }).catch(error => {
        console.error('Error deleting person:', error);
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
