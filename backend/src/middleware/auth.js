/**
 * @module middleware/auth
 * @description JWT authentication middleware backed by the local demo store.
 */

const jwt = require('jsonwebtoken');
const localStore = require('../data/localStore');

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        data: null,
        error: 'Access denied. No token provided.',
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = localStore.getUserById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        data: null,
        error: 'Token is valid but user no longer exists.',
      });
    }

    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      personaId: user.personaId,
    };
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        data: null,
        error: 'Token has expired. Please login again.',
      });
    }

    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        data: null,
        error: 'Invalid token.',
      });
    }

    return res.status(500).json({
      success: false,
      data: null,
      error: 'Authentication error.',
    });
  }
};

const requireManager = (req, res, next) => {
  if (req.user.role !== 'manager') {
    return res.status(403).json({
      success: false,
      data: null,
      error: 'Access denied. Manager role required.',
    });
  }

  next();
};

module.exports = { verifyToken, requireManager };
