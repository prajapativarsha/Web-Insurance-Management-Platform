const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({adapter});

/**
 * Create a new policy
 */
const createPolicy = async (policyData) => {
    // Generate a unique policy number (e.g., POL-YYYYMMDD-XXXX)
    const policy_number = `POL-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    return await prisma.policies.create({
        data: {
            ...policyData,
            policy_number,
            status: 'active',
            coverage_amount : 100000
        }
    });
};

/**
 * Get a list of policies with pagination, search, and filters
 */
const getPolicies = async (query) => {
    const { page = 1, limit = 10, search, status, policy_type, customer_id, agent_id } = query;
    const skip = (page - 1) * limit;

    // Build the dynamic WHERE clause based on filters
    const where = {};
    if (status) where.status = status;
    if (policy_type) where.policy_type = policy_type;
    if (customer_id) where.customer_id = Number(customer_id);
    if (agent_id) where.agent_id = Number(agent_id);
    
    // Add search functionality for policy number or customer name
    if (search) {
        where.OR = [
            { policy_number: { contains: search, mode: 'insensitive' } },
            { customers: { name: { contains: search, mode: 'insensitive' } } }
        ];
    }

    // Fetch data and the total count for frontend pagination
    const [policies, total] = await Promise.all([
        prisma.policies.findMany({
            where,
            skip: Number(skip),
            take: Number(limit),
            include: { customers: true, agents: true },
            orderBy: { created_at: 'desc' }
        }),
        prisma.policies.count({ where })
    ]);

    return { policies, total, page: Number(page), totalPages: Math.ceil(total / limit) };
};

/**
 * Get a single policy with all related history
 */
const getSinglePolicy = async (id) => {
    return await prisma.policies.findUnique({
        where: { id: Number(id) },
        include: {
            customers: true,
            agents: true,
            payments: true,
            claims: true
        }
    });
};

/**
 * Update allowed fields on a policy
 */
const updatePolicy = async (id, updateData) => {
    return await prisma.policies.update({
        where: { id: Number(id) },
        data: updateData
    });
};



/**
 * Soft Cancel a Policy (DELETE /policies/:id)
 * Preserves historical data for audits and reports.
 */
const cancelPolicy = async (id) => {
    return await prisma.policies.update({
        where: { id: Number(id) },
        data: { status: 'cancelled' }
    });
};

/**
 * Renew a Policy (PUT /policies/:id/renew)
 * Resets the active status and updates dates/premium.
 */
const renewPolicy = async (id, renewData) => {
    return await prisma.policies.update({
        where: { id: Number(id) },
        data: {
            start_date: renewData.start_date,
            end_date: renewData.end_date,
            ...(renewData.premium && { premium_amount: renewData.premium }),
            status: 'ACTIVE'
        }
    });
};

module.exports = {
    createPolicy,
    getPolicies,
    getSinglePolicy,
    updatePolicy,
    cancelPolicy,
    renewPolicy
};

