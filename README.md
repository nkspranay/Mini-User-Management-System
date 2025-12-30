Mini User Management System

A full-stack web application for managing user accounts with authentication, role-based access control (RBAC), and basic user lifecycle management.
Built as part of the Backend Developer Intern Assessment for Purple Merit Technologies.

🔍 Project Overview & Purpose

The Mini User Management System allows users to sign up, log in, and manage their profiles securely, while administrators can manage user accounts through an admin dashboard.

The project demonstrates:

Secure authentication flows

Role-based authorization (admin vs user)

Clean backend architecture

Practical frontend integration

Cloud deployment best practices

🛠 Tech Stack Used
Backend

Python

Django & Django REST Framework

JWT Authentication

PostgreSQL (cloud-hosted)

bcrypt (Django default password hashing)

Frontend

React (Vite)

React Hooks

Axios

Protected Routes

Database

PostgreSQL (Render-hosted)

Deployment

Backend: Render

Frontend: Vercel

✨ Features
Authentication

User signup with full name, email, and password

Email format and password strength validation

JWT issued on signup and login

Secure login/logout flow

Endpoint to fetch current authenticated user

User Features

View own profile

Update full name and email (explicit edit mode)

Change password (requires current password)

JWT-protected access

Admin Features

View all users with pagination

Activate user accounts

Deactivate user accounts

Role-based access enforcement

Security

Password hashing

JWT authentication

Role-based access control (RBAC)

Protected routes

Input validation

Consistent error responses

Environment-based secrets

📁 Project Structure
Backend/
├── core/                 # Django project settings
├── users/                # User app (models, views, serializers)
├── frontend/             # React (Vite) frontend
├── manage.py
├── requirements.txt
├── .gitignore
├── .env.example
└── README.md

▶️ Setup Instructions (Run Locally)
Backend Setup
cd Backend
python -m venv venv
venv\Scripts\activate   # Windows
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

🔐 Environment Variables
Backend (Backend/.env)
SECRET_KEY=
DEBUG=
DATABASE_URL=
ALLOWED_HOSTS=
JWT_SECRET=

Frontend (frontend/.env)
VITE_API_BASE_URL=


⚠️ .env files are excluded from the repository via .gitignore.

🚀 Deployment
Backend

Deployed on Render

Connected to a cloud-hosted PostgreSQL database

Environment variables configured via Render dashboard

Frontend

Deployed on Vercel

frontend/ configured as project root

SPA routing handled using vercel.json

🌐 Live Deployment Links

Frontend: https://mini-user-management-system-psi.vercel.app

Backend: https://<your-backend-render-url>.onrender.com

📡 API Documentation
Authentication
POST /api/auth/signup/
POST /api/auth/login/
GET  /api/auth/me/

User
GET  /api/users/profile/
PUT  /api/users/profile/
PUT  /api/users/change-password/

Admin
GET    /api/admin/users/
PATCH  /api/admin/users/{id}/activate/
PATCH  /api/admin/users/{id}/deactivate/

🧪 Testing

Backend unit tests written using Django REST Framework testing utilities

APIs tested using Postman

Authentication, authorization, and validation logic verified

📽 Walkthrough Video

A 3–5 minute screen-recorded walkthrough demonstrating:

User signup & login

Role-based access control

Admin dashboard functionality

Profile update & password change

Live frontend & backend interaction

📎 Video Link: (to be added)

👤 Author

Kedar Sai Pranay Nadipalli
Engineering Student | Aspiring Software Developer

✅ Assessment Compliance Summary

✔ Backend requirements
✔ Frontend requirements
✔ Database design
✔ Security best practices
✔ Deployment completed
✔ Documentation provided