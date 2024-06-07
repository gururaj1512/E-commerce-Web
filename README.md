# E-Commerce Web Application (MERN Stack)

Welcome to the E-Commerce Web Application repository! This project is a full-stack e-commerce application built using the MERN stack (MongoDB, Express, React, Node.js). It provides a complete and functional online store with features like product listings, user authentication, shopping cart, order management, and more.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [Sample Images](#sample-images)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization
- Product listing and details
- Shopping cart functionality
- Order management
- Admin dashboard for product and order management
- Payment Accessibility
- Responsive design for mobile and desktop

## Technologies Used

- **Frontend:**
  - React
  - Redux (for state management)
  - React Router (for navigation)
  - Axios (for API requests)
  - Tailwind (for styling)
  - Mui (for Components)

- **Backend:**
  - Node.js
  - Express
  - MongoDB (with Mongoose)
  - JWT (for authentication)
  - bcrypt (for password hashing)
  - cloudinary (for image mapping)
  - stripe (for payments)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine
- MongoDB installed and running locally or a MongoDB Atlas account
- Git installed on your machine

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. Install dependencies for both the frontend and backend:

    ```bash
    # Install backend dependencies
    npm install

    # Install frontend dependencies
    cd ./frontend
    npm install
    ```

## Running the Application

To run the application locally, follow these steps:

1. Set up environment variables:

    Create a `.env` file in the `backend` directory and add the following variables:

    ```env
    DB_URI=your_mongodb_connection_string
    PORT=4000
    CLOUDINARY_NAME=coludinary_name
    CLOUDINARY_API_KEY=coludinary_api_key
    CLOUDINARY_API_SECRET=coludinary_api_seceret
    FRONTEND_URL = "http://localhost:3000"
    ```

2. Start the backend server:

    ```powershell
    npm run dev
    ```

3. Start the frontend development server:

    ```powershell
    cd ./frontend
    npm run start
    ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Folder Structure

```plaintext
your-repo-name/
│
├── backend/                # Backend (Node.js, Express)
│   ├── config/             # Configuration files
|   |   ├── .env            # Enviroment Variables
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # Express routes
│   ├── middleware/         # Middleware
│   ├── server.js           # Entry point
│   └── package.json        # Backend dependencies and scripts
│
├── frontend/               # Frontend (React)
│   ├── public/             # Public assets
│   ├── src/                # Source files
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── redux/          # Redux actions and reducers
│   │   ├── App.js          # Main App component
│   │   ├── index.js        # Entry point
│   └── package.json        # Frontend dependencies and scripts
│
├── .gitignore              # Git ignore file
└── README.md               # Readme file
