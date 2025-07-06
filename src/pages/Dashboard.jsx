import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/');

    try {
      setLoading(true);
      const res = await axios.get('/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data.tasks || []);
      setError('');
    } catch (err) {
      setError('Failed to load tasks.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      alert('Failed to delete task.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <h2>Your Tasks</h2>
      <Link to="/task/create" className="btn" style={{ marginBottom: '20px' }}>
        + New Task
      </Link>

      {loading && <p>Loading tasks...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && tasks.length === 0 && <p>No tasks available.</p>}

      {!loading &&
        tasks.map((task) => {
          const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

          return (
            <div key={task._id} className={`card ${isOverdue ? 'overdue' : ''}`}>
              <div className="task-header">
                <h3>{task.title}</h3>
                <div className="badges">
                  <span className={`badge ${task.priority?.toLowerCase() || 'medium'}`}>{task.priority}</span>
                  <span className={`badge ${
                    task.status === 'completed' ? 'badge-success' :
                    task.status === 'in-progress' ? 'badge-info' :
                    'badge-warning'
                  }`}>
                    {task.status}
                  </span>
                </div>
              </div>
              <p>{task.description}</p>
              {task.dueDate && (
                <p style={{ fontSize: '0.9rem' }}>
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              )}
              {isOverdue && <p className="overdue-text">⚠️ This task is overdue!</p>}

              <div className="task-actions">
                <button className="btn-outline" onClick={() => navigate(`/task/edit/${task._id}`)}>Edit</button>
                <button className="btn-outline danger" onClick={() => handleDelete(task._id)}>Delete</button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Dashboard;
