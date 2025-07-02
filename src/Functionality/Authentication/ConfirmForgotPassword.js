// ================= CONFIRM PASSWORD RESET OTP FUNCTION =================
const sequelize = require("../../DatabaseConnection");
const OTP = require("../../Models/UserManagement/OTP.Model");
const User = require("../../Models/UserManagement/User.Model");
const Logger = require("../../Utils/Logger");

const confirmPasswordChange = async (req, res) => {
  Logger.http(`Incoming Confirm Reset OTP Request: ${req.method} ${req.url}`);
  Logger.debug("Request Body:", req.body);

  const t = await sequelize.transaction();

  try {
    const { otp } = req.body;
    const { userId } = req.params;

    if (!userId || !otp) {
      return res.status(400).json({ success: false, message: "User ID and OTP are required." });
    }

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      await t.rollback();
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const userOtp = await OTP.findOne({
      where: {
        user_id: user.id,
        otp: otp,
        otp_type: "password_reset",
        is_used: false,
      },
      order: [['created_at', 'DESC']],
      transaction: t,
    });

    if (!userOtp) {
      await t.rollback();
      return res.status(400).json({ success: false, message: "Invalid or expired OTP." });
    }

    userOtp.is_used = true;
    await userOtp.save({ transaction: t });

    await t.commit();

    Logger.info("Password reset OTP confirmed", { userId: user.id, email: user.email });

    return res.status(200).json({
      success: true,
      message: "OTP confirmed. You can now reset your password.",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }
    Logger.error("Confirm Reset OTP error", { message: error.message, stack: error.stack });
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = { confirmPasswordChange };
