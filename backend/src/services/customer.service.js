const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({adapter});

const createCustomer = async (data) => {
    // Convert the incoming date string to a valid ISO-8601 DateTime
    if (data.date_of_birth) {
        data.date_of_birth = new Date(data.date_of_birth).toISOString();
    }
    return await prisma.customers.create({
        data
    });
};

const getCustomerList = async (searchQuery = "") => {
    const customers = await prisma.customers.findMany({
        where: {
            OR: [
                {
                    users: {
                        name: { contains: searchQuery, mode: "insensitive" }
                    }
                },
                {
                    users: {
                        email: { contains: searchQuery, mode: "insensitive" }
                    }
                },
                {
                    id_document_number: { contains: searchQuery, mode: "insensitive" }
                }
            ]
        },
        include: {
            users: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    role: true,
                    is_active: true
                }
            }
        }
    });
     return customers.map(customer => {
        // Format to "YYYY-MM-DD" (Standard for HTML date inputs)
        const formattedDate = customer.date_of_birth 
            ? customer.date_of_birth.toISOString().split('T')[0] 
            : null;
        return {
            ...customer,
            date_of_birth: formattedDate
        };
    });
};

const getCustomerById = async (id) => {
    const customer =  await prisma.customers.findUnique({
        where: { 
            id: Number(id) 
        },
        include: {
            users: {
                select: { name: true, email: true, phone: true, is_active: true }
            },
            policies: true,
            claims: true,
            payments: true
        }
    });
     if (customer && customer.date_of_birth) {
        // Formatting it before returning it to the controller
        customer.date_of_birth = customer.date_of_birth.toISOString().split('T')[0];
    }

    return customer;

};

const updateCustomer = async (id, data) => {
    // Convert the incoming date string to a valid ISO-8601 DateTime
    if (data.date_of_birth) {
        data.date_of_birth = new Date(data.date_of_birth).toISOString();
    }
    return await prisma.customers.update({
        where: { 
            id: Number(id) 
        },
        data
    });
};

const deactivateCustomer = async (id) => {
    // First, find the customer to get their linked user_id
    const customer = await prisma.customers.findUnique({
        where: { id: Number(id) },
        select: { user_id: true }
    });

    if (!customer) {
        throw new Error("Customer not found");
    }

    // Soft delete by deactivating the parent user account
    return await prisma.users.update({
        where: { 
            id: customer.user_id 
        },
        data: { 
            is_active: false 
        }
    });
};


module.exports = {
    createCustomer,
    getCustomerList,
    getCustomerById,
    updateCustomer,
    deactivateCustomer
};