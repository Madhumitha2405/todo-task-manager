const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/authMiddleware');

// ✅ GET tasks with pagination and filtering
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const filter = {
      $or: [{ owner: req.user.id }, { sharedWith: req.user.id }]
    };

    const tasks = await Task.find(filter).skip(skip).limit(limit);
    const total = await Task.countDocuments(filter);

    res.json({
      tasks,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error('Error fetching tasks:', err.message);
    res.status(500).json({ msg: 'Failed to fetch tasks' });
  }
});

// ✅ POST create task with logs
router.post('/', auth, async (req, res) => {
  try {
    console.log('Incoming Task Body:', req.body);
    console.log('Authenticated User:', req.user);

    const task = new Task({
      ...req.body,
      owner: req.user.id,
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error('Task Create Error:', err.message);
    res.status(500).json({ msg: 'Failed to create task' });
  }
});

// ✅ PUT update task
router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error('Update error:', err.message);
    res.status(500).json({ msg: 'Failed to update task' });
  }
});

// ✅ DELETE task
router.delete('/:id', auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    console.error('Delete error:', err.message);
    res.status(500).json({ msg: 'Failed to delete task' });
  }
});

module.exports = router;
