# Scalable Web App with Authentication & Dashboard

This is a full-stack MERN (MongoDB, Express, React, Node.js) application built for a frontend developer intern assignment. It includes a React frontend, a Node.js/Express backend, and a MongoDB database, complete with JWT-based authentication and full CRUD functionality for a "Tasks" entity.

## Tech Stack

* **Frontend:** React.js, React Router, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (with Mongoose)
* **Authentication:** JSON Web Tokens (JWT)
* **Security:** `bcryptjs` for password hashing
* **Styling:** Custom CSS (from `src/index.css`)

---

## 🚀 How to Run

You will need **two separate terminals** open to run this project: one for the backend and one for the frontend.

### 1. Backend Setup (Terminal 1)

1.  **Navigate to the backend folder:**
    ```bash
    cd Crud-Assignment/backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create Environment File (`.env`)**
    You MUST create a file named `.env` inside the `/backend` folder. This file holds your secret keys and database connection string.

    ```bash
    # /backend/.env
    
    # Get this connection string from a free MongoDB Atlas account
    MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxx.mongodb.net/myDatabase?retryWrites=true&w=majority
    
    # Make this any long, random string for signing tokens
    JWT_SECRET=your_super_secret_key_12345
    
    # The port your backend server will run on
    PORT=5000
    ```
    > **Note:** You must get your `MONGO_URI` from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and **whitelist your IP address** (or allow access from anywhere: `0.0.0.0/0`) in their Network Access settings.

4.  **Run the backend server:**
    ```bash
    npm run dev
    ```
    Your backend API will now be running on `http://localhost:5000`.

---

### 2. Frontend Setup (Terminal 2)

1.  **Open a new terminal** and navigate to the frontend folder:
    ```bash
    cd Crud-Assignment/frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the frontend app:**
    ```bash
    npm start
    ```
    Your React application will automatically open in your browser at `http://localhost:3000`.

> **Note:** The frontend `package.json` contains a `"proxy": "http://localhost:5000"` entry. This is critical as it forwards all API requests from the React app (on port 3000) to the backend server (on port 5000), avoiding CORS (Cross-Origin Resource Sharing) errors.

---

## ✅ Core Features

* User Registration & Login (JWT-based)
* Protected Routes (Dashboard & Profile are inaccessible unless logged in)
* Full CRUD operations for Tasks (Create, Read, Update, Delete)
* User Profile fetching and updating
* Password Hashing (`bcryptjs`)
* Client-side and Server-side validation
* Professional & Responsive UI (Custom CSS)
