const { z } = require("zod");

// Schema for a customer submitting a new claim (POST /claims)
const createClaimSchema = z.object({
  body: z.object({
    policy_id: z
      .number({ required_error: "Policy ID is required" })
      .int("Policy ID must be an integer")
      .positive("Policy ID must be positive"),

    description: z
      .string({ required_error: "Claim description is required" })
      .min(
        10,
        "Description must be at least 10 characters long to provide enough detail",
      )
      .max(1000, "Description is too long"),

    claim_amount: z
      .number({ required_error: "Claim amount is required" })
      .positive("Claim amount must be greater than zero"),
  }),
});

// Schema for an agent rejecting a claim (PUT /claims/:id/reject)
const rejectClaimSchema = z.object({
  body: z.object({
    rejection_reason: z
      .string({ required_error: "Rejection reason is required" })
      .min(5, "Please provide a clear and detailed reason for the rejection")
      .max(500, "Rejection reason is too long"),
  }),
});

// Optional: Validate the ID parameter in the URL for the agent/admin routes
const claimIdParamSchema = z.object({
  params: z.object({
    id: z
      .string()
      .regex(/^\d+$/, "Claim ID must be a valid number")
      .transform(Number),
  }),
});

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    res.status(400).json({ success: false, errors: error.errors });
  }
};

module.exports = {
  validate,
  createClaimSchema,
  rejectClaimSchema,
  claimIdParamSchema,
};
