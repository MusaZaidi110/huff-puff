const sequelize = require("../../DatabaseConnection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const NodeCache = require("node-cache"); // For in-memory refresh token caching
const User = require("../../Models/UserManagement/User.Model");
const Logger = require("../../Utils/Logger");

const refreshTokenCache = new NodeCache({ stdTTL: 30 * 24 * 60 * 60 }); // 30 days

const loginCustomerAuth = async (req, res) => {
  Logger.http(`Incoming Login Request: ${req.method} ${req.url}`);
  Logger.debug("Request Body:", req.body);

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      Logger.warn("Login failed: User not found", { email });
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    if (!user.is_active) {
      return res.status(403).json({ success: false, message: "User account is not active. Please verify your email." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      Logger.warn("Login failed: Invalid password", { email });
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken = jwt.sign(payload, process.env.JWT, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || process.env.JWT, { expiresIn: "30d" });
    refreshTokenCache.set(user.id, refreshToken);

    user.last_login_at = new Date();
    await user.save();

    Logger.info("User logged in", { userId: user.id, email: user.email });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: accessToken,
      user: user,
    });
  } catch (error) {
    Logger.error("Login error", { message: error.message, stack: error.stack, body: req.body });
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { loginCustomerAuth, refreshTokenCache };
