const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

// Initialize the adapter with your environment variable
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });


// Pass the adapter into PrismaClient
const prisma = new PrismaClient({ adapter });
const register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Check if user exists
        const existingUser = await prisma.users.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'Email already in use' });
        }

        // Hash password
        const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 12;
        const password_hash = await bcrypt.hash(password, saltRounds);

        // Create user (role defaults to customer based on Prisma schema)
        await prisma.users.create({
            data: { name, email, password_hash, phone }
        });

        res.status(201).json({ success: true, message: 'Registration successful' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.users.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Compare hash
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
         if (user.role === 'customer') {
            const customerRecord = await prisma.customers.findFirst({
                where: { user_id: user.id }
            });
            if (customerRecord) {
                user.customer_id = customerRecord.id; // Attach to user object
            }
        } else if (user.role === 'agent') {
            const agentRecord = await prisma.agents.findFirst({
                where: { user_id: user.id }
            });
            if (agentRecord) {
                user.agent_id = agentRecord.id; // Attach to user object
            }
        }

        // Generate JWT
        const accessToken = generateToken(user);

        res.status(200).json({
            success: true,
            data: {
                accessToken,
                user: { id: user.id, name: user.name, role: user.role }
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { register, login };