const sequelize = require("../../DatabaseConnection");
const { WelcomeEmail } = require("../../EmailTemplates/Welcome/welcome-email");
const OTP = require("../../Models/UserManagement/OTP.Model");
const User = require("../../Models/UserManagement/User.Model");
const Logger = require("../../Utils/Logger");
const { sendEmail } = require("../../Utils/SendEmail");

const confirmRegistration = async (req, res) => {
  Logger.http(
    `Incoming Confirm Registration Request: ${req.method} ${req.url}`
  );
  Logger.debug("Request Body:", req.body);

  const t = await sequelize.transaction();

  try {
    const { otp } = req.body;
    const { userId } = req.params;

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      await t.rollback();
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const userOtp = await OTP.findOne({
      where: {
        user_id: user.id,
        otp: otp,
        otp_type: "email_verification",
        is_used: false,
      },
      order: [["created_at", "DESC"]],
      transaction: t,
    });

    if (!userOtp) {
      await t.rollback();
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP." });
    }

    userOtp.is_used = true;
    await userOtp.save({ transaction: t });

    user.is_active = true;
    user.email_verified_at = new Date();
    await user.save({ transaction: t });

    await t.commit();

    Logger.info("User registration confirmed", {
      userId: user.id,
      email: user.email,
    });

    // Sending Welcome Email
    const displayName = user.user_name?.trim() || user.email;
    await sendWelcomeEmail(user.email, displayName);

    return res.status(200).json({
      success: true,
      message: "Registration confirmed successfully.",
    });
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }
    Logger.error("Confirm Registration error", {
      message: error.message,
      stack: error.stack,
    });
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

const sendWelcomeEmail = async (email, userName) => {
  const template = WelcomeEmail(userName);
  const success = await sendEmail({
    to: email,
    subject: "Welcome to HUFF&PUFF Burgers",
    template,
  });
  Logger.info("OTP email sent", { email });
  return success;
};

module.exports = { confirmRegistration };
