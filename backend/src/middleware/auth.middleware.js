const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');


const verifyToken = async (req, res, next) => {
  // 1. Extract the token from the Authorization header (Format: "Bearer <token>")
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    });
  }

  try {
    // 2. Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach the decoded payload (e.g., id, role) to the request object
    req.user = decoded;

    // --- NEW ADDITION: Map User ID to Customer/Agent ID ---
    if (req.user.role === 'customer') {
      const customerRecord = await prisma.customers.findFirst({
        where: { user_id: req.user.id } // Adjust 'user_id' if your foreign key is named differently
      });

      if (customerRecord) {
        // Attach the specific customer table ID directly to the request
        req.user.customer_id = customerRecord.id;
      }
    } else if (req.user.role === 'agent') {
      const agentRecord = await prisma.agents.findFirst({
        where: { user_id: req.user.id }
      });

      if (agentRecord) {
        // Attach the specific agent table ID
        req.user.agent_id = agentRecord.id;
      }
    }


    // 4. Move to the next middleware or controller
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.'
    });
  }
};

module.exports = { verifyToken };