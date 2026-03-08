module.exports = (requiredFields) => {
  return (req, res, next) => {
    for (const field of requiredFields) {
      if (!req.body[field]) {
        // If a required field is missing, kick them out with a 400 error
        return res.status(400).json({
          error: `Missing required field: ${field}`
        });
      }
    }
    // If everything is good, 'next()' lets them pass to the next step
    next(); 
  };
};