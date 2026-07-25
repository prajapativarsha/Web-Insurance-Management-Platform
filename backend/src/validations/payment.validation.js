// payment.validation.js
const { z } = require('zod');

// Schema for POST /policies/:id/payments
const createPaymentSchema = z.object({
  body: z.object({
    amount: z.number().positive("Amount must be a positive number"),
    payment_method: z.string().min(1, "Payment method is required (e.g., Credit Card, Bank Transfer)"),
    transaction_ref: z.string().optional(),
    receipt_path: z.string().optional(),
  }),
});

// Schema for PATCH /payments/:id/status
const updatePaymentStatusSchema = z.object({
  body: z.object({
    status: z.enum(['pending', 'success', 'failed', 'cancelled', 'refunded'], {
      errorMap: () => ({ message: "Status must be pending, success, failed, cancelled, or refunded" })
    }),
  }),
});

// Middleware to validate requests (if you don't already have a generic one)
const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }
};

module.exports = {
  createPaymentSchema,
  updatePaymentStatusSchema,
  validate
};