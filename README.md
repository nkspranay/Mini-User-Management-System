# Mini User Management System

A full-stack web application built as part of a Backend Developer Intern assessment.  
The project demonstrates secure authentication, role-based access control (RBAC), and basic user management workflows using a modern backend and frontend stack.

---

## 🚀 Features

### Authentication & Authorization
- User signup and login using JWT authentication
- Secure password hashing
- Role-based access control (Admin / User)
- Protected routes on both backend and frontend

### User Features
- View own profile
- Update profile details
- Change password
- Logout functionality

### Admin Features
- View all registered users
- Activate / deactivate user accounts
- Admin-only access to user management APIs and dashboard

---

## 🛠 Tech Stack

### Backend
- Python
- Django & Django REST Framework
- JWT Authentication
- PostgreSQL (cloud-hosted)
- Deployed on Render

### Frontend
- React (Vite)
- Axios
- React Router
- Custom CSS for UI/UX
- Deployed on Vercel

---

## 🌐 Live URLs

- **Backend API:**  
  https://YOUR-BACKEND-URL.onrender.com

- **Frontend Application:**  
  https://YOUR-FRONTEND-URL.vercel.app

---

## 🔑 API Endpoints (Backend)

### Authentication
- `POST /api/auth/signup/`
- `POST /api/auth/login/`
- `GET /api/auth/me/`

### User
- `GET /api/users/profile/`
- `PUT /api/users/profile/`
- `PUT /api/users/change-password/`

### Admin
- `GET /api/admin/users/`
- `PUT /api/admin/users/<id>/status/`

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
