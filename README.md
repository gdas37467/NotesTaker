# NotesTaker

A full-stack Notes Taking Application built with Next.js (frontend) and Flask (backend). Users can register, log in, and manage notes with create, view, edit, and delete features.


## Tech Stack
### Frontend

Next.js (App Router)

Zustand

Axios

Tailwind CSS

### Backend
Flask
MongoDB
Flask-JWT for authentication

## INSTALLATION AND SETUP

### Clone the repository:
git clone git@github.com:gdas37467/NotesTaker.git

cd notes-app

2. Create .env file

In the root directory (same level as docker-compose.yml), create a .env file:

# Secret for JWT auth
JWT_SECRET_KEY=supersecretkey


👉 MONGO_URL and NEXT_PUBLIC_API_URL are already defined in docker-compose.yml.

3. Build and run the containers
docker compose up --build


This will start:

Frontend → http://localhost:3000

Backend API → http://localhost:5000

MongoDB → running on localhost:27017

4. Stop the app
docker compose down


### API ENDPOINTS

Authentication
POST /auth/signup Register new user
POST /auth/login Login and receive JWT

Notes
GET /notes Get all notes (auth required)
POST /notes Create new note
PUT /notes/:id Update note
DELETE /notes/:id Delete note

### Features

User authentication (Sign In / Sign Up)

JWT-based secure APIs

Notes CRUD (Create, Read, Update, Delete)

API calls with Axios
