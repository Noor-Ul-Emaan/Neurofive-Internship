# Week 3 - Task 1: Forms, Validation & Real User Feedback

This project is part of my **Full-Stack Web Development Internship at NeuroFive Solutions**. It demonstrates a robust multi-field form implementation with double-layer validation (Client-side and Server-side), file upload handling, and real-time user feedback.

---

## 🚀 Key Features

* **Multi-Field Input Handling:** Includes Full Name, Email, Select Dropdown (Role), Date Picker (Joining Date), Textarea (Bio), and File Upload (Profile Picture).
* **Client-Side Validation:** Field-specific instant error validation preventing unnecessary network requests.
* **Server-Side Validation:** Strict Express middleware validation enforcing payload constraints on the backend.
* **File Upload Processing:** Integrated `multer` middleware for memory storage and file type/size validation (Image files under 2MB).
* **User Feedback UI:** Disabled submit button with loading state during API calls and clear success/error banner feedback.

---

## 🛠️ Tech Stack

* **Frontend:** React, Vite, CSS3
* **Backend:** Node.js, Express.js, Multer, CORS

---

## 📂 Project Structure

```text
Week-3-Task-1-Forms-Validation/
├── server/       # Node.js Express Server with Multer & Server Validation
├── client/       # React Frontend Form Application
└── README.md     # Project Documentation