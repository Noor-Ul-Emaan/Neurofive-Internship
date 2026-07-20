# Week 2 - Task 1: Full CRUD Application (Frontend & Backend Integration)

This project is part of my **Full-Stack Web Development Internship at NeuroFive Solutions**. It demonstrates a complete end-to-end full-stack loop where a custom React frontend communicates directly with a custom Node.js/Express REST API to perform full CRUD operations.

---

## 🚀 Features

* **Create (POST):** Add new items/records directly from the UI.
* **Read (GET):** Fetch and render live data asynchronously from the backend API.
* **Update (PUT):** Dynamically populate input fields and edit existing records in real-time.
* **Delete (DELETE):** Remove items instantly with client-side UI updates.
* **Loading & Error Handling:** Explicit state management tracking loading delays and fallback network error messages on every user action.

---

## 🛠️ Tech Stack & Architecture

* **Frontend:** React, Vite, CSS3 (Flexbox/Modular design)
* **Backend:** Node.js, Express.js, CORS, RESTful API Design
* **Project Structure:** Monorepo architecture separating client and server workspaces:
  ```text
  Week-2-Task-1-Full-CRUD/
  ├── server/       # Node.js Express REST API
  └── client/       # React + Vite Frontend App