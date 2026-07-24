const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policy.controller');

// Import your authentication and role middlewares
// Adjust the path based on your exact folder structure
const { verifyToken } = require('../middleware/auth.middleware');
const { authorizeRole } = require('../middleware/role.middleware');

// Apply verifyToken to ALL policy routes - you must be logged in to access any of this
router.use(verifyToken);

// ==========================================
// CUSTOMER & STAFF ROUTES (Viewing)
// ==========================================
// Customers can view lists and single policies. 
// (Note: Your controller/service should ideally check that customer_id matches req.user.id for customers)
router.get('/', policyController.getPolicies);
router.get('/:id', policyController.getSinglePolicy);

// ==========================================
// ADMIN & AGENT ONLY ROUTES (Modifying)
// ==========================================
// Only Admins and Agents can create, edit, renew, or cancel policies
router.use(authorizeRole('admin', 'agent'));

router.post('/', policyController.createPolicy);
router.put('/:id', policyController.updatePolicy);
router.delete('/:id', policyController.cancelPolicy); // Soft cancel
router.put('/:id/renew', policyController.renewPolicy);

module.exports = router;