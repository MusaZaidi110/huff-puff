const sequelize = require("../../DatabaseConnection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Models Loading
const User = require("../../Models/UserManagement/User.Model");

const Logger = require("../../Utils/Logger");

const loginCustomerAuth = async (req, res) => {
  Logger.http(`Incoming Login Request: ${req.method} ${req.url}`);
  Logger.debug("Request Body:", req.body);

  try {
    const { email, password } = req.body;

    // ===== Validation =====
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // ===== Check if user exists =====
    const user = await User.findOne({ where: { email } });
    if (!user) {
      Logger.warn("Login failed: User not found", { email });
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ===== Check if user is active =====
    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: "User account is not active. Please verify your email.",
      });
    }

    // ===== Compare passwords =====
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      Logger.warn("Login failed: Invalid password", { email });
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ===== Generate JWT =====
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

    // ===== Update last login =====
    user.last_login_at = new Date();
    await user.save();

    Logger.info("User logged in", {
      userId: user.id,
      email: user.email,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        user_name: user.user_name,
        profile_image_url: user.profile_image_url,
      },
    });
  } catch (error) {
    Logger.error("Login error", {
      message: error.message,
      stack: error.stack,
      body: req.body,
    });
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { loginCustomerAuth };
