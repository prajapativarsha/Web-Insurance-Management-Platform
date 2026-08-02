const z = require('zod');

//Schema for creating a new customer profile
const createEmployeeSchema = z.object({
    body: z.object({
        user_id: z.number({
            required_error: "User ID is required",
            invalid_type_error: "User ID must be a number"
        }),
        department: z.string().max(100, "Department cannot exceed 100 characters").optional() ,
    })
});

// Schema for updating an existing customer profile
// user_id is excluded here because a profile shouldn't change its owner
const updateEmployeeSchema = z.object({
    body: z.object({
        department: z.string().max(100, "Department cannot exceed 100 characters").optional()

    })
});

module.exports = {
    createEmployeeSchema,
    updateEmployeeSchema
};