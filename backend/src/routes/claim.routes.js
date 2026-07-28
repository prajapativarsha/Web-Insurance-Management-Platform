const express = require("express");
const router = express.Router();

// Import controllers, middlewares, and validations
const claimController = require("../controllers/claim.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const { authorizeRole } = require("../middleware/role.middleware");
const {
  createClaimSchema,
  rejectClaimSchema,
  validate
} = require("../validations/claim.validation");
const upload = require('../middleware/upload.middleware');

// 1. AUTHENTICATION: Require a valid JWT for ALL claim routes
router.use(verifyToken);

// ==========================================
// CUSTOMER ROUTES
// ==========================================

// Submit a new claim
router.post(
  "/my-claims/:id/new",
  authorizeRole("customer"), // 2. AUTHORIZATION: Only customers
  upload.single('claimDocument'),
  validate(createClaimSchema), // 3. VALIDATION: Check policy_id & amount
  claimController.createClaim,
);

// Get all claims belonging to the logged-in customer
router.get(
  "/my-claims",
  authorizeRole("customer"),
  claimController.getMyClaims,
);
//get all claims belonging to a specific policy
router.get(
  "/my-claims/:id",
  authorizeRole("customer"),
  claimController.getMyClaimsById,
);

// ==========================================
// AGENT & ADMIN ROUTES
// ==========================================

// View all claims in the system (Agents/Admins)
router.get(
  "/",
  authorizeRole("Administrator", "Insurance Agent"),
  claimController.getAllClaims,
);

// Verify a claim's documents
router.put(
  "/:id/verify",
  authorizeRole("Administrator", "Insurance Agent"),
  claimController.verifyClaim,
);

// Officially approve a claim
router.put(
  "/:id/approve",
  authorizeRole("Administrator", "Insurance Agent"),
  claimController.approveClaim,
);

// Reject a claim (requires a mandatory reason)
router.put(
  "/:id/reject",
  authorizeRole("Administrator", "Insurance Agent"),
  validate(rejectClaimSchema), // VALIDATION: Ensures they provide a reason
  claimController.rejectClaim,
);

module.exports = router;
