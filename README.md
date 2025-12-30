# Mini User Management System

A full-stack user management application built using **Django (REST API)** and **React (Vite)**.  
This project was developed as part of the **Backend Developer Intern Assessment for Purple Merit Technologies**.

The application focuses on **secure authentication**, **role-based access control (RBAC)**, and **practical full-stack deployment**, rather than unnecessary complexity.

---

## 🔍 Project Overview

The Mini User Management System allows users to:

- Register and authenticate securely
- View and manage their own profile
- Change their password
- Access protected routes using JWT

Administrators can:

- View all users with pagination
- Activate or deactivate user accounts
- Enforce role-based access control

The project demonstrates a clean separation of concerns between backend and frontend, along with real-world deployment practices.

---

## 🧠 Key Concepts Demonstrated

- JWT-based authentication
- Role-based access control (Admin vs User)
- Secure password handling
- RESTful API design
- Frontend–backend integration
- Environment-based configuration
- Cloud deployment

---

## 🛠 Tech Stack

### Backend
- Python
- Django
- Django REST Framework
- JWT Authentication
- PostgreSQL (cloud-hosted on Render)
- Django default password hashing (PBKDF2)

### Frontend
- React (Vite)
- Axios
- React Hooks
- Protected Routes

### Deployment
- Backend: Render
- Frontend: Vercel
- Database: PostgreSQL (Render)

---

## ✨ Features

### Authentication
- User signup with name, email, and password
- Email and password validation
- Secure login and logout
- JWT issued on signup and login
- Endpoint to fetch authenticated user details

### User Features
- View own profile
- Update name and email (explicit edit mode)
- Change password (requires current password)
- JWT-protected access to user routes

### Admin Features
- View all users with pagination
- Activate user accounts
- Deactivate user accounts
- Role-based access enforcement

### Security
- Password hashing
- JWT authentication
- Role-based access control (RBAC)
- Input validation
- Consistent error handling
- Environment-based secrets management

---

## 📁 Project Structure
Backend/
├── core/
├── users/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── vercel.json
│   ├── package.json
│   └── vite.config.js
├── manage.py
├── requirements.txt
├── .env.example
├── .gitignore
└── README.md

## ▶️ Running the Project Locally

### Backend Setup

cd Backend
python -m venv venv
venv\Scripts\activate    # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Backend runs at:
http://localhost:8000

Frontend Setup
cd Backend/frontend
npm install
npm run dev


Frontend runs at:
http://localhost:5173

## 🔐 Environment Variables

### Backend (`Backend/.env`)
- `SECRET_KEY` — Django secret key
- `DEBUG` — Set to `true` for development
- `DATABASE_URL` — PostgreSQL connection string
- `ALLOWED_HOSTS` — Allowed hosts for Django
- `JWT_SECRET` — Secret key for JWT signing

### Frontend (`frontend/.env`)
- `VITE_API_BASE_URL` — Base URL of the backend API

🚀 Deployment
Backend

Deployed on Render

Connected to a cloud-hosted PostgreSQL database

Environment variables configured via Render dashboard

Frontend

Deployed on Vercel

frontend/ configured as the project root

SPA routing handled using vercel.json

🌐 Live Deployment Links

- **Frontend:** [mini-user-management-system-psi.vercel.app](https://mini-user-management-system-psi.vercel.app)
- **Backend:** [mini-user-management-system-y6eq.onrender.com](https://mini-user-management-system-y6eq.onrender.com)


📡 API Documentation

### Authentication

#### POST `/api/auth/login/`

**Request**
{
  "email": "user@example.com",
  "password": "password123"
}
**Response**
{
  "access": "jwt_access_token_here",
  "refresh": "jwt_refresh_token_here"
}
#### GET `/api/auth/me/`
Header
Authorization: Bearer <access_token>
**Response**
{
  "email": "user@example.com",
  "full_name": "John Doe",
  "role": "user"
}
#### PUT `/api/users/change-password/`
**Request**
{
  "old_password": "oldpassword123",
  "new_password": "newpassword123"
}
**Response**
{
  "message": "Password updated successfully"
}


🧪 Testing

- Implemented 5+ backend unit tests using Django REST Framework testing utilities
- Covered authentication, authorization, and validation logic

## 🎥 Walkthrough Video

A short walkthrough video explaining the application flow, API usage, and key implementation details.

👉 Watch the walkthrough here:  
https://drive.google.com/file/d/1U_3rlFJomNrxXJFrMfcKrf945tVGW758/view?usp=sharing


👤 Author

Kedar Sai Pranay Nadipalli
Engineering Student | Aspiring Software Developer


