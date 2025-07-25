# 📝 Todo Task Manager

A modern full-stack task management web application that allows users to create, update, delete, and manage tasks. It includes authentication via Google login, task sharing, and an attractive UI with real-time updates.

## 🌟 Features

- ✅ Google Authentication (OAuth 2.0)
- ✅ Create, update, and delete tasks
- ✅ Track task status: Incomplete, In Progress, Completed
- ✅ Responsive and attractive UI
- ✅ REST API with Express.js and MongoDB

---

## 🚀 Getting Started

###  Prerequisites

- Node.js & npm
- MongoDB (local or cloud)
- Google Cloud OAuth credentials

---

### 🛠️ Project Setup

#### 1. Clone the Repository
git clone https://github.com/YOUR_USERNAME/todo-task-manager.git
cd todo-task-manager

2. Setup the Backend
cd backend
npm install
Create a .env file in the backend/ folder with:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret


Start the backend:
cd backend
npx nodemon run dev


3. Setup the Frontend
cd ../frontend
npm install
npm run dev


Video of working🤗
https://drive.google.com/file/d/1W8SkJ8EnbgPMyF9oX3oHfAz-Ed5IX9ba/view?usp=drive_link
