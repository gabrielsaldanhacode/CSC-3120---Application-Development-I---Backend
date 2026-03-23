const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // 1. Get the token from the request header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Missing authorization header' });
  }

  // Tokens usually look like "Bearer <token>", so we split it to get the <token>
  const token = authHeader.split(' ')[1];

  try {
    // 2. Verify the token using a secret key
    // NOTE: Keep 'your_secret_key' exactly like this for now to match the professor's starter code
    const decoded = jwt.verify(token, 'your_secret_key');
    
    // 3. Attach the user info (id, role) to the request object
    req.user = decoded;
    
    // 4. Move on to the next function
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};