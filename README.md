# 📞 Phonebook Backend

[![Deploy on Render](https://img.shields.io/badge/Deploy%20on-Render-46b7b8?logo=Render&logoColor=white)](https://render.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-brightgreen?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen?logo=mongodb)](https://mongodb.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-181717?logo=github)](https://github.com/Judethedude007/fullstack-part3)

A robust backend for a modern Phonebook Application, built with Node.js and Express. Easily scalable and ready for deployment!

---

## 🚀 Live Demo

🔗 [Check out the deployed backend on Render](https://your-app-name.onrender.com)

---

## 📚 Table of Contents

- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
- [Deploying to Render](#deploying-to-render)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [License](#license)

---

## ✨ Features

- RESTful API for phonebook management
- Fetch, add, and delete contacts
- MongoDB integration for persistent storage
- Easy deployment on Render
- Clean, modular codebase

---

## 📓 API Endpoints

```http
GET    /api/persons        # Get all persons
GET    /api/persons/:id    # Get a person by ID
POST   /api/persons        # Add a new person
DELETE /api/persons/:id    # Delete a person by ID
```

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://mongodb.com/) (local or Atlas)

### Installation

```bash
# Clone the repo
git clone https://github.com/Judethedude007/fullstack-part3.git

# Enter the project directory
cd fullstack-part3

# Install dependencies
npm install
```

### Running Locally

```bash
# Start the server
npm start
```

The backend will run on `http://localhost:3001/` by default.

---

## 🚀 Deploying to Render

1. **Create a Render Account**
   - Go to [Render](https://render.com/) and sign up.

2. **Create a New Web Service**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Choose the repo `Judethedude007/fullstack-part3`

3. **Configure the Service**
   - **Name**: Choose a meaningful name
   - **Region**: Closest to you
   - **Branch**: e.g., `main`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variable**: `PORT=3001`

4. **Deploy**
   - Click "Create Web Service"
   - Monitor build and logs in the dashboard

---

## 🔑 Environment Variables

Create a `.env` file at the root with:

```env
PORT=3001
MONGODB_URI=your-mongodb-connection-string
```

---

## 🗂️ Project Structure

```
fullstack-part3/
├── controllers/
├── models/
├── utils/
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
```

---

## 📝 License

This project is [MIT](LICENSE) licensed.

---

## 🙌 Author

Made with ❤️ by [Judethedude007](https://github.com/Judethedude007)
