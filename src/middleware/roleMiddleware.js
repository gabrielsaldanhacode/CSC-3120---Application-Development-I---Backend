module.exports = (requiredRole) => {
  return (req, res, next) => {
    // We get the user role from the 'req.user' we created in the previous middleware
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // If they have the right role, let them through
    next();
  };
};