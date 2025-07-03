const sequelize = require("../../DatabaseConnection");
const jwt = require("jsonwebtoken");
const { refreshTokenCache } = require("./LoginUserAuth");
const User = require("../../Models/UserManagement/User.Model");
const Logger = require("../../Utils/Logger");

const refreshAccessToken = async (req, res) => {
  Logger.http(`Incoming Refresh Token Request: ${req.method} ${req.url}`);

  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required." });
    }

    const storedRefreshToken = refreshTokenCache.get(userId);
    if (!storedRefreshToken) {
      return res.status(403).json({ success: false, message: "Refresh token expired or not found. Please login again." });
    }

    let payload;
    try {
      payload = jwt.verify(storedRefreshToken, process.env.JWT_REFRESH_SECRET || process.env.JWT);
    } catch (err) {
      Logger.warn("Invalid refresh token", { userId, error: err.message });
      return res.status(403).json({ success: false, message: "Invalid refresh token. Please login again." });
    }

    const user = await User.findByPk(userId);
    if (!user || !user.is_active) {
      return res.status(403).json({ success: false, message: "User not found or inactive." });
    }

    const newAccessToken = jwt.sign(payload, process.env.JWT, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

    Logger.info("Access token refreshed", { userId: user.id, email: user.email });

    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully.",
      token: newAccessToken,
    });
  } catch (error) {
    Logger.error("Refresh token error", { message: error.message, stack: error.stack });
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = { refreshAccessToken };
