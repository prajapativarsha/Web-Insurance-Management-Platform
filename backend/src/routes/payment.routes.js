// payment.routes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const { createPaymentSchema, updatePaymentStatusSchema, validate } = require('../validations/payment.validation');

// Import your existing security middlewares
const { verifyToken } = require('../middleware/auth.middleware');
const { authorizeRole } = require('../middleware/role.middleware');

// Apply verifyToken to ALL payment routes
router.use(verifyToken);

// --- 1. Overdue Premiums Route ---
// (Must be defined BEFORE /:id routes so "overdue" isn't treated as an ID)
router.get(
  '/payments/overdue', 
  authorizeRole('admin', 'agent'), 
  paymentController.getOverdue
);

// --- 2. Update Payment Status ---
router.patch(
  '/payments/:id/status',
  authorizeRole('admin', 'agent'),
  validate(updatePaymentStatusSchema),
  paymentController.updateStatus
);

// --- 3. Policy Payment Routes ---
// Customers can pay their own policies; Admins and Agents can process payments too
router.post(
  '/policies/:id/payments',
  validate(createPaymentSchema),
  paymentController.createPayment
);

// View payment history
router.get(
  '/policies/:id/payments',
  paymentController.getPolicyPayments
);

//view all payment history of a customer
router.get('/payments/:id',paymentController.getAllPayments);

module.exports = router;