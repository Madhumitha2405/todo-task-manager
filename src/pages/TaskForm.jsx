import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('in-progress');
  const [priority, setPriority] = useState('Medium');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/tasks', { title, description, status, priority }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Task created successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to create task.');
    }
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4">Create New Task</h3>
      <form onSubmit={handleSubmit} className="card shadow-sm p-4">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="incomplete">In complete</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Priority</label>
          <select className="form-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="text-end">
          <button type="submit" className="btn btn-success">Save Task</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
