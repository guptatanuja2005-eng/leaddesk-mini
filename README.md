# LeadDesk Mini

## Live Demo

Frontend:
https://leaddesk-mini-rust.vercel.app

Backend:
https://leaddesk-mini-1-r6uy.onrender.com

## Test Credentials

Email:
admin@example.com

Password:
admin123

## Tech Stack

Frontend
- React
- Vite
- Axios
- Tailwind CSS

Backend
- Node.js
- Express
- MongoDB Atlas
- JWT
- bcryptjs

## Features

- Lead submission form
- Admin authentication
- Protected dashboard
- Search leads
- Update lead status
- Logout

## Data Model

Lead
- name
- email
- budget
- message
- status
- createdAt

Admin
- name
- email
- password (hashed)

## Authentication

- JWT-based authentication
- Passwords hashed using bcrypt
- Protected routes use Bearer tokens
- JWT stored in localStorage

## Installation

Frontend

npm install
npm run dev

Backend

npm install
npm start
