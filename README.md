# IQverse Backend

Backend API for the **IQverse** platform.
This project is built using **Node.js, Express, and MongoDB** and provides the server-side functionality for the IQverse application.

---

## 🚀 Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Cookie Parser
* CORS

---

## 📂 Project Structure

```
backend
│
├── src
│   ├── db          # Database connection
│   ├── controllers # Business logic
│   ├── models      # Mongoose models
│   ├── routes      # API routes
│   ├── middlewares # Custom middlewares
│   └── app.js      # Express app configuration
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Installation

Clone the repository:

```
git clone https://github.com/Jay31kr/IQversebackend.git
```

  

Go to the project directory:

```
cd backend
```

Install dependencies:

```
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory.

Example:

```
PORT=8000
MONGO_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5173 || * 
JWT_SECRET=your_secret_key
```

---

## ▶️ Running the Server

Start the development server:

```
npm run dev
```

or

```
node src/index.js
```

---

## 📌 Features

* RESTful API structure
* MongoDB database connection
* Environment variable configuration
* Middleware setup (CORS, JSON parsing, cookies)
* Scalable folder structure

---

## 🧑‍💻 Author

Jay Kumar Gupta
