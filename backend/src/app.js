const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');

const app = express();

// Global Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1/auth', authRoutes);

// Global Error Handler (Optional but recommended)
app.use((err, req, res, next) => {
    res.status(500).json({ success: false, message: 'Internal server error' });
});

module.exports = app;