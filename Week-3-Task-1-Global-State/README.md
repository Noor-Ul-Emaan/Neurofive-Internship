# Week 3 - Task 2: Global State, Data Fetching Patterns & UI Polish

This project is part of my **Full-Stack Web Development Internship at NeuroFive Solutions**. It focuses on scalable architecture using React Context API for global state management, avoiding prop-drilling, and providing high-end UI Polish with Skeleton Loaders and Empty States.

---

## 🚀 Key Features

* **Global State Management:** Implemented React `Context API` (`AppContext`) to manage global user session and app data without prop-drilling.
* **UI Polish - Skeleton Loaders:** Shimmer/Skeleton loading indicators during API requests instead of blank screens or simple spinners.
* **UI Polish - Empty States:** Interactive empty state components displayed when API returns zero items.
* **Theme & Auth Shared State:** Centralized global management for authentication status and application settings.

---

## 🛠️ Tech Stack

* **Frontend:** React, Vite, Context API, CSS3
* **Backend:** Node.js, Express.js, CORS

---

## 📂 Project Structure

```text
Week-3-Task-2-Global-State/
├── server/       # Express Backend with delayed endpoints for testing loaders
├── client/       # React Frontend with Context API & Skeleton Components
└── README.md     # Project Documentation