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
  authorizeRole("customer", "agent", "admin"),
  claimController.getMyClaimsById,
);

// ==========================================
// AGENT & ADMIN ROUTES
// ==========================================

// View all claims in the system (Agents/Admins)
router.get(
  "/",
  authorizeRole("admin", "agent"),
  claimController.getAllClaims,
);

router.get(
  "/review-claims",
  authorizeRole( "agent"),
  claimController.getAgentClaims,
);

router.put(
    "/:id/assign/:e_id",
    authorizeRole("admin"),
    claimController.assignClaim,
);

// Verify a claim's documents
router.put(
  "/:id/verify",
  authorizeRole( "agent"),
  claimController.verifyClaim,
);

// Officially approve a claim
router.put(
  "/:id/approve",
  authorizeRole("admin", "agent"),
  claimController.approveClaim,
);

// Reject a claim (requires a mandatory reason)
router.put(
  "/:id/reject",
  authorizeRole("admin", "agent"),
  validate(rejectClaimSchema), // VALIDATION: Ensures they provide a reason
  claimController.rejectClaim,
);

module.exports = router;
