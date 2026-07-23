const z = require('zod');

// Schema for creating a new customer profile
const createCustomerSchema = z.object({
    body: z.object({
        user_id: z.number({
            required_error: "User ID is required",
            invalid_type_error: "User ID must be a number"
        }),
        date_of_birth: z.string().optional(),
        address: z.string().max(255, "Address cannot exceed 255 characters").optional(),
        id_document_type: z.enum(["Passport", "CNIC", "Driving License"]).optional(),
        id_document_number: z.string().max(100, "Document number cannot exceed 100 characters").optional()
    })
});

// Schema for updating an existing customer profile
// user_id is excluded here because a profile shouldn't change its owner
const updateCustomerSchema = z.object({
    body: z.object({
        date_of_birth: z.string().optional(),
        address: z.string().max(255, "Address cannot exceed 255 characters").optional(),
        id_document_type: z.enum(["Passport", "CNIC", "Driving License"]).optional(),
        id_document_number: z.string().max(100, "Document number cannot exceed 100 characters").optional(),
        kyc_status: z.boolean().optional().transform((val) => {
            if (val === undefined) return undefined;
            // Maps true to "verified" and false to "pending" (your DB's default)
            return val ? "verified" : "pending";
        })

    })
});

module.exports = {
    createCustomerSchema,
    updateCustomerSchema
};