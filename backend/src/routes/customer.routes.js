const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller');

// Note: If you have auth middleware (e.g., verifyToken) from Day 1/2, 
// you should import it here and add it to these routes.
// const { verifyToken, isAdminOrAgent } = require('../middleware/auth.middleware');

// Create a new customer profile
// Example: POST /api/v1/customers
router.post('/', customerController.createCustomer);

// Get list of all customers (with optional ?search= query)
// Example: GET /api/v1/customers or GET /api/v1/customers?search=john
router.get('/', customerController.getCustomerList);

// Get a single customer's full profile and history by ID
// Example: GET /api/v1/customers/5
router.get('/:id', customerController.getCustomer);

// Update a customer's profile
// Example: PUT /api/v1/customers/5
router.put('/:id', customerController.updateCustomer);

// Deactivate a customer (Soft delete)
// Example: DELETE /api/v1/customers/5
router.delete('/:id', customerController.deactivateCustomer);

module.exports = router;