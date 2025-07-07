const sequelize = require("../../DatabaseConnection");
// Models Loading
const User = require("../../Models/UserManagement/User.Model");
const OTP = require("../../Models/UserManagement/OTP.Model");

const Logger = require("../../Utils/Logger");
const {
  forgetPasswordTemplate,
} = require("../../EmailTemplates/OTP-Email-Handler/otp-email");
const sendEmail = require("../../Utils/SendEmail");

const forgotPassword = async (req, res) => {
  Logger.http(`Incoming Forgot Password Request: ${req.method} ${req.url}`);
  Logger.debug("Request Body:", req.body);

  const t = await sequelize.transaction(); // Start transaction

  try {
    const { email } = req.body;

    // ===== Validation =====
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // ===== Check if user exists =====
    const user = await User.findOne({
      where: { email },
      transaction: t,
    });

    if (!user) {
      Logger.warn("Forgot Password: User not found", { email });
      await t.rollback();
      return res.status(404).json({
        success: false,
        message: "User with this email does not exist",
      });
    }

    // ===== Generate OTP =====
    const otpCode = generateOTP();

    // ===== Save OTP =====
    await OTP.create(
      { OTP: otpCode, user_id: user.id, OTP_type: "password_reset" },
      { transaction: t }
    );

    // ===== Commit transaction BEFORE sending email =====
    await t.commit();

    // ===== Send OTP Email =====
    await sendOTPEmail(user.email, otpCode);

    Logger.info("Forgot Password OTP sent", {
      userId: user.id,
      email: user.email,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email for password reset",
    });
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }
    Logger.error("Forgot Password error", {
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

// ====== Helpers ======
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP
};

const sendOTPEmail = async (email, otpCode) => {
  const template = forgetPasswordTemplate(otpCode);
  const success = await sendEmail({
    to: email,
    subject: "HUFF&PUFF Password Reset OTP",
    template: template,
  });
  Logger.info("OTP email sent for password reset", { email });
  return success;
};

module.exports = { forgotPassword };
