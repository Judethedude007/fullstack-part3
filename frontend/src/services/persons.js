import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/persons'; // Ensure this is correct

const personsService = {
  getAll: () => axios.get(baseUrl).then(response => response.data),
  create: (newPerson) => axios.post(baseUrl, newPerson).then(response => response.data),
  update: (id, updatedPerson) => axios.put(`${baseUrl}/${id}`, updatedPerson).then(response => response.data),
  remove: (id) => axios.delete(`${baseUrl}/${id}`).then(response => response.data),
};

export default personsService;
