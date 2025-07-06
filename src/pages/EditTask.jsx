import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('in-progress');
  const [priority, setPriority] = useState('Medium');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`/api/tasks?page=1&limit=50`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const task = res.data.tasks.find((t) => t._id === id);
        if (task) {
          setTitle(task.title);
          setDescription(task.description);
          setStatus(task.status);
          setPriority(task.priority);
        } else {
          alert('Task not found');
          navigate('/dashboard');
        }
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put(`/api/tasks/${id}`, {
        title,
        description,
        status,
        priority,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Task updated!');
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to update task.');
    }
  };

  return (
    <div className="container">
      <h3>Edit Task</h3>
      <form onSubmit={handleUpdate} className="card">
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="in-complete">In complete</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button type="submit" className="btn">Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;
