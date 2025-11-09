import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const userInfo = useMemo(() => JSON.parse(localStorage.getItem('userInfo')), []);

  const config = useMemo(() => {
    if (!userInfo) return {};
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
  }, [userInfo]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/tasks', config);
      setTasks(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch tasks. Please log in again.');
      setLoading(false);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('userInfo');
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      fetchTasks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, navigate]);

  const createTaskHandler = async (e) => {
    e.preventDefault();
    if (!title) return;
    try {
      const { data } = await axios.post(
        '/api/tasks',
        { title, description },
        config
      );
      setTasks([data, ...tasks]);
      setTitle('');
      setDescription('');
    } catch (err) {
      setError('Failed to create task.');
    }
  };

  const deleteTaskHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`/api/tasks/${id}`, config);
        setTasks(tasks.filter((task) => task._id !== id));
      } catch (err) {
        setError('Failed to delete task.');
      }
    }
  };

  const toggleCompleteHandler = async (task) => {
    try {
      const { data } = await axios.put(
        `/api/tasks/${task._id}`,
        { isCompleted: !task.isCompleted },
        config
      );
      setTasks(tasks.map((t) => (t._id === task._id ? data : t)));
    } catch (err) {
      setError('Failed to update task.');
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="page-title">Welcome, {userInfo?.username}!</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="card task-form">
        <h2 className="card-title">Create New Task</h2>
        <form onSubmit={createTaskHandler}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Task Title"
              className="search-input" // Re-using search style
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Task Description (Optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </form>
      </div>

      <div className="card">
        <h2 className="card-title">Your Tasks</h2>
        <input
          type="text"
          placeholder="Search tasks..."
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <ul className="task-list">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <li
                  key={task._id}
                  className={`task-item ${task.isCompleted ? 'completed' : ''}`}
                >
                  <div className="task-item-content">
                    <input
                      type="checkbox"
                      checked={task.isCompleted}
                      onChange={() => toggleCompleteHandler(task)}
                    />
                    <div className="task-item-details">
                      <h3>{task.title}</h3>
                      {task.description && <p>{task.description}</p>}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTaskHandler(task._id)}
                    className="task-item-delete"
                  >
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <p className="no-tasks">You have no tasks. Add one above!</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;