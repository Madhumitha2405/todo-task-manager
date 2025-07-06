const express = require('express');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

dotenv.config(); // ✅ Load .env first
require('./config/passport'); // ✅ Setup passport strategies

const app = express();

connectDB(); // ✅ Connect to MongoDB

// ✅ Middleware setup
app.use(express.json()); // ✅ Needed to parse req.body
app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
