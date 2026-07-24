const { z } = require('zod');

// Schema for creating a new policy (POST /policies)
const createPolicySchema = z.object({
    customer_id: z.number().int().positive("Customer ID is required"),
    agent_id: z.number().int().positive().optional(), // Optional, based on your API specs
    policy_type: z.string().min(1, "Policy type is required"),
    premium_amount: z.number().positive("Premium amount must be greater than zero"),
    start_date: z.string().datetime({ message: "Invalid start date format (ISO 8601 required)" }),
    end_date: z.string().datetime({ message: "Invalid end date format (ISO 8601 required)" })
});

// Schema for updating an existing policy (PUT /policies/:id)
// We only include the mutable fields. 
// The .strict() method will reject the request if they try to sneak in 'policy_number' or 'customer_id'.
const updatePolicySchema = z.object({
    premium: z.number().positive().optional(),
    coverage: z.string().optional(),
    frequency: z.string().optional(),
    end_date: z.string().datetime().optional()
}).strict();

// Schema for renewing a policy (PUT /policies/:id/renew)
const renewPolicySchema = z.object({
    start_date: z.string().datetime(),
    end_date: z.string().datetime(),
    premium: z.number().positive().optional() // New premium if changed
});

module.exports = {
    createPolicySchema,
    updatePolicySchema,
    renewPolicySchema
};