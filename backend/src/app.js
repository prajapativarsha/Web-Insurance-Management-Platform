const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const customerRoutes = require('./routes/customer.routes');
const policyRoutes = require('./routes/policy.routes'); 
const paymentRoutes = require('./routes/payment.routes');
const claimRoutes = require('./routes/claim.routes');
const reportRoutes = require('./routes/report.routes');
const employeeRoutes = require('./routes/employee.routes');


app.set('trust proxy', 1);
// Global Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1', paymentRoutes);
app.use('/api/v1/policies', policyRoutes);
app.use('/api/v1/claims', claimRoutes);
app.use('/api/v1/reports', reportRoutes);
app.use('/api/v1/employees', employeeRoutes);

// Expose the uploads directory to the frontend
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Global Error Handler
app.use((err, req, res, next) => {
    res.status(500).json({ success: false, message: 'Internal server error' });
});

module.exports = app;





