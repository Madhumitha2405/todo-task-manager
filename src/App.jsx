import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import TaskForm from './pages/TaskForm';
import Navbar from './components/Navbar';
import EditTask from './pages/EditTask';
import RegisterPage from './pages/RegisterPage'; 

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/task/create" element={<TaskForm />} />
           <Route path="/task/edit/:id" element={<EditTask />} />
           <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;