# Week 2 - Task 2: Authentication Flow (Signup, Login, Protected Pages)

This project is part of my **Full-Stack Web Development Internship at NeuroFive Solutions**. It implements a complete, secure JWT-based authentication system integrated with a React frontend and Node.js/Express backend.

---

## 🚀 Features

* **User Registration (Signup):** Client-side form validation with backend password hashing using `bcryptjs`.
* **User Authentication (Login):** Validates credentials and issues a secure JSON Web Token (JWT).
* **Protected Routes:** Restricts unauthenticated access to the Dashboard page with auto-redirects to Login.
* **Token Management:** Secure client-side storage of JWT tokens attached to request headers (`Authorization: Bearer <token>`).
* **Session Termination (Logout):** Clears authentication tokens and state instantly.

---

## 🛠️ Tech Stack

* **Frontend:** React, React Router DOM, CSS3
* **Backend:** Node.js, Express.js, JWT (`jsonwebtoken`), Password Hashing (`bcryptjs`), CORS

---

## 📂 Project Structure

```text
Week-2-Task-2-Auth-Flow/
├── server/       # Node.js + Express Auth API (JWT & Bcrypt)
├── client/       # React App with Auth Routes & Protected Pages
└── README.md     # Project Documentation