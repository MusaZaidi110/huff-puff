const jwt = require("jsonwebtoken");
const { Logger } = require("../Utils/Logger.js"); // Assuming you have a Logger

const JWT_SECRET = process.env.JWT_SECRET; // Changed to standard naming convention

/**
 * Extracts JWT token from request headers
 * @param {Object} req - Express request object
 * @returns {string|null} - Returns token if found, otherwise null
 */
const extractToken = (req) => {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  
  if (!authHeader) return null;

  // Support both "Bearer <token>" and raw token formats
  const parts = authHeader.split(" ");
  return parts.length === 2 && parts[0] === "Bearer" ? parts[1] : authHeader;
};

/**
 * Base authentication middleware
 * @param {Object} options - Middleware options
 * @param {boolean} options.requireAdmin - Whether to require admin privileges
 * @returns {Function} - Express middleware function
 */
const authenticate = ({ requireAdmin = false } = {}) => {
  return async (req, res, next) => {
    try {
      const token = extractToken(req);
      
      if (!token) {
        Logger.warn("Authentication attempt without token", { ip: req.ip });
        return res.status(401).json({ 
          success: false,
          error: "ACCESS_DENIED",
          message: "No authentication token provided" 
        });
      }

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);
      
      // Attach user to request
      req.user = decoded;

      next();
    } catch (error) {
      Logger.error("Authentication error", { 
        error: error.message,
        stack: error.stack,
        ip: req.ip
      });

      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          error: "TOKEN_EXPIRED",
          message: "Authentication token has expired"
        });
      }

      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          success: false,
          error: "INVALID_TOKEN",
          message: "Invalid authentication token"
        });
      }

      res.status(500).json({
        success: false,
        error: "AUTHENTICATION_FAILED",
        message: "Failed to authenticate request"
      });
    }
  };
};

// Specific middleware instances
const AuthRequired = authenticate();
const checkAdmin = authenticate({ requireAdmin: true });

module.exports = { 
  AuthRequired, 
  checkAdmin,
  authenticate // Export base function for flexibility
};