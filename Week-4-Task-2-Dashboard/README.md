# Week 4 - Task 2: Dashboard with Data Visualization

This project is part of my **Full-Stack Web Development Internship at NeuroFive Solutions**. It features an interactive, real-time analytics dashboard with multiple data visualizations powered by Recharts and Express REST API backend.

---

## 🚀 Key Features

* **3 Interactive Charts:**
  - **Area Chart:** Visualizes monthly revenue trends.
  - **Bar Chart:** Displays weekly conversion leads.
  - **Donut/Pie Chart:** Represents category market distribution.
* **Dynamic Category Filtering:** Interactive category dropdown that triggers real-time backend re-fetching and seamless chart animation updates.
* **Dynamic Stat Cards:** Key metrics overview (Revenue, Total Orders, Active Users, Growth) calculated dynamically.
* **Fully Responsive Design:** Dark-themed modern dashboard layout optimized for desktop, tablet, and mobile displays.

---

## 🛠️ Tech Stack

* **Frontend:** React, Vite, Recharts, Custom CSS3
* **Backend:** Node.js, Express.js, CORS

---

## 📂 Project Structure

```text
Week-4-Task-2-Dashboard/
├── server/       # Express API endpoint returning aggregated metrics & chart data
├── client/       # React + Recharts dashboard with interactive category filters

└── README.md     # Task documentation