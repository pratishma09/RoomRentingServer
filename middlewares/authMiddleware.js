const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.header(token);

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, 'secretkey');

    // Add user ID from the token to the request
    req.userId = decoded.userId;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
