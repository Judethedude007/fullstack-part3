import React, { useState, useEffect } from 'react';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    personsService.getAll().then(initialPersons => {
      console.log('Fetched persons:', initialPersons); // Add this lineialPersons); // Add this line
      if (Array.isArray(initialPersons)) {ons)) {
        setPersons(initialPersons);sons(initialPersons);
      } else {
        console.error('Expected an array but got:', initialPersons); console.error('Expected an array but got:', initialPersons);
      }
    }).catch(error => {
      console.error('Error fetching persons:', error);onsole.error('Error fetching persons:', error);
    });
  }, []);  }, []);

  const addPerson = (event) => { => {
    event.preventDefault();;
    const personObject = {ct = {
      name: newName,
      number: newNumber,number: newNumber,
    };    };

    personsService.create(personObject).then(returnedPerson => {rnedPerson => {
      setPersons(persons.concat(returnedPerson));ons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
    }).catch(error => {
      console.error('Error adding person:', error);onsole.error('Error adding person:', error);
    });});
  };  };

  const deletePerson = (id) => {
    if (window.confirm('Do you really want to delete this person?')) {o delete this person?')) {
      personsService.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id));s.filter(person => person.id !== id));
      }).catch(error => {
        console.error('Error deleting person:', error);onsole.error('Error deleting person:', error);
      }); });
    }}
  };  };

  const handleNameChange = (event) => {=> {
    setNewName(event.target.value);setNewName(event.target.value);
  };  };

  const handleNumberChange = (event) => {=> {
    setNewNumber(event.target.value);setNewNumber(event.target.value);
  };  };

  return ((
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>nSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />: <input value={newName} onChange={handleNameChange} />
        </div>>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />er: <input value={newNumber} onChange={handleNumberChange} />
        </div>>
        <div>
          <button type="submit">add</button>ton type="submit">add</button>
        </div>>
      </form>
      <h2>Numbers</h2>Numbers</h2>
      <ul>
        {persons.map(person => ( (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person.id)}>delete</button>tton onClick={() => deletePerson(person.id)}>delete</button>
          </li>/li>
        ))}
      </ul>>
    </div></div>
  ););
};};

export default App;export default App;

