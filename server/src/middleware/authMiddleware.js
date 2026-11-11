
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  try {
    let token;

    // Check whether the request contains an authorization token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        message: 'Not authorized. Please log in.'
      });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store the logged-in user's ID in the request
    req.user = { id: decoded.id };

    next();

  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token. Please log in again.'
    });
  }
};

module.exports = protect;
