const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const { authorizeRole } = require('../middleware/role.middleware');


// Apply authentication and ADMIN role check to all routes in this file
router.use(verifyToken, authorizeRole('admin'));

router.get('/claims-stats', reportController.getClaimsStats);
router.get('/premium-collections', reportController.getPremiumCollections);
router.get('/policy-sales', reportController.getPolicySales);
router.get('/dashboard/summary', reportController.getDashboardSummary);


module.exports = router;