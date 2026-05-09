# ExpertEase – Real-Time Expert Session Booking System

A full-stack real-time expert booking platform built using React, Node.js, Express, MongoDB, and Socket.io.

---

# Live Demo

## Frontend
https://expert-system-git-main-harshs-projects-609c04ce.vercel.app

## Backend API
https://expert-system-aoot.onrender.com/api/experts

---

# Tech Stack

## Frontend
- React (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- Socket.io Client
- React Hot Toast
- Lucide React

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Socket.io

## Deployment
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

# Features

## Expert Listing
- View all experts
- Search experts by name
- Filter experts by category
- Pagination support
- Loading & empty states

## Expert Details
- Expert profile page
- Available slots grouped by date
- Real-time slot updates using Socket.io
- Disabled booked slots

## Booking System
- Create expert session bookings
- Form validation
- Success & error toast notifications
- Prevents double booking using MongoDB transactions

## My Bookings
- Fetch bookings by email
- Booking status support
  - Pending
  - Confirmed
  - Completed
  - Cancelled

## Real-Time Features
- Socket.io integration
- Instant slot updates across multiple users/tabs

---

# Project Structure

## Frontend

```bash
frontend/
├── src/
│   ├── api/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── socket/
│   └── App.jsx
```

## Backend

```bash
backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   ├── seeder/
│   └── db/
├── app.js
└── server.js
```

---

# Installation

## Clone Repository

```bash
git clone <your-repository-url>
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

## Frontend Environment Variables

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

---

# Backend Setup

```bash
cd backend

npm install

npm run dev
```

## Backend Environment Variables

Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_uri
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

---

# API Endpoints

## Experts

### Get Experts

```http
GET /api/experts
```

### Get Expert By ID

```http
GET /api/experts/:id
```

---

## Bookings

### Create Booking

```http
POST /api/bookings/create
```

### Get Bookings By Email

```http
GET /api/bookings/get?email=
```

### Update Booking Status

```http
PATCH /api/bookings/:id/status
```

---

# Important Implementation Details

## Double Booking Prevention

Implemented using:
- MongoDB Transactions
- Atomic Updates
- Unique Compound Index

This prevents:
- same expert
- same date
- same slot

from being booked twice.

---

# Real-Time Updates

Implemented using Socket.io.

When a user books a slot:
- all connected users instantly see updated slot availability.

---

# Author

Harsh
