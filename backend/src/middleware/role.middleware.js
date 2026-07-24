const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    // Check if the user's role exists in the array of allowed roles
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Forbidden. You do not have permission to perform this action.' 
      });
    }
    
    // If they have the right role, let them proceed
    next();
  };
};

module.exports = { authorizeRole };