# Phonebook Backend

This is the backend for the Phonebook application.

## Deployed Application

The backend is deployed at: [https://your-app-name.onrender.com](https://your-app-name.onrender.com)

## API Endpoints

- GET `/api/persons` - Get all persons
- GET `/api/persons/:id` - Get a person by ID
- POST `/api/persons` - Add a new person
- DELETE `/api/persons/:id` - Delete a person by ID

## Steps to Deploy to Render

1. **Create a Render Account**:
   Go to [Render](https://render.com/) and create an account if you don't already have one.

2. **Create a New Web Service**:
   - Go to the Render dashboard.
   - Click on "New" and select "Web Service".
   - Connect your GitHub repository to Render.
   - Select the repository that contains your backend code.

3. **Configure the Web Service**:
   - **Name**: Choose a name for your service.
   - **Region**: Select a region close to you.
   - **Branch**: Select the branch you want to deploy (e.g., `main`).
   - **Build Command**: Use `npm install`.
   - **Start Command**: Use `npm start`.
   - **Environment**: Set the environment variable `PORT` to `3001`.

4. **Deploy the Application**:
   - Click on "Create Web Service" to deploy your application.
   - Render will automatically build and deploy your application.

5. **Monitor the Logs**:
   - Go to the Render dashboard.
   - Select your web service.
   - Click on the "Logs" tab to monitor the logs.

### Create a README.md

Ensure your `README.md` file at the root of your repository includes a link to your online application.
