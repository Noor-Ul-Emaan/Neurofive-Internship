# Week 1 - Task 2: Consume a Public API

A clean and responsive React application built with Vite that fetches and renders live user data from a public API, fulfilling all the structural frontend requirement guidelines.

## Features Covered

- **Live Data Fetching:** Consumes the public JSONPlaceholder Users API (`https://jsonplaceholder.typicode.com/users`).
- **Loading State:** Displays a user-friendly loading indicator (`⏳ Loading live data...`) while fetching the data to ensure the screen is never blank.
- **Error Handling:** Gracefully handles network or API failures with a clean error alert and an explicit fallback message.
- **Real-time Filter/Search:** Includes an interactive search input box allowing users to instantly filter the fetched list by name.

## Tech Stack

- **Frontend Framework:** React (Vite template)
- **Styling:** Vanilla CSS (Custom Responsive Layout)

## Project Structure

```text
Week-1-Task-2-Consume-a-Public-API/
├── src/
│   ├── App.jsx           # Core logic (Fetch, Loading, Filter, Error handling)
│   ├── App.css           # Layout structures & custom styles
│   └── main.jsx          # App entry point
├── package.json
└── README.md