const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const customerRoutes = require('./routes/customer.routes');
const policyRoutes = require('./routes/policy.routes'); 
const paymentRoutes = require('./routes/payment.routes');

const app = express();

// Global Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1/auth', authRoutes);
// Mount the customer routes
app.use('/api/v1/customers', customerRoutes);
// Mount the routes
app.use('/api/v1', paymentRoutes);
app.use('/api/v1/policies', policyRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    res.status(500).json({ success: false, message: 'Internal server error' });
});

module.exports = app;





