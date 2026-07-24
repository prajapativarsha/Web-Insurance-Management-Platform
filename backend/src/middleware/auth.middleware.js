const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
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