const sequelize = require("../../DatabaseConnection");
const bcrypt = require("bcryptjs");
const User = require("../../Models/UserManagement/User.Model");
const OTP = require("../../Models/UserManagement/OTP.Model");
const Logger = require("../../Utils/Logger");
const { OTPTemplate } = require("../../EmailTemplates/OTP-Email-Handler/otp-email");
const { sendEmail } = require("../../Utils/SendEmail");

const createCustomerAuth = async (req, res) => {
  Logger.http(`Incoming Auth Request: ${req.method} ${req.url}`);
  Logger.debug("Request Body:", req.body);

  const t = await sequelize.transaction();

  try {
    const { email, password, user_name, phone_number } = req.body;

    if (!email || !password || !user_name || !phone_number) {
      return res.status(400).json({
        success: false,
        message: "Email, password, user name, and phone number are required",
      });
    }

    const existingUser = await User.findOne({ where: { email }, transaction: t });
    if (existingUser) {
      Logger.warn("User already exists", { email });
      await t.rollback();
      return res.status(409).json({ success: false, message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      email,
      password: hashedPassword,
      role: "customer",
      is_active: false,
      user_name,
      phone_number,
    }, { transaction: t });

    Logger.info("User created", { userId: createdUser.id, email: createdUser.email });

    const otpCode = generateOTP();
    await OTP.create({ otp: otpCode, user_id: createdUser.id }, { transaction: t });

    await t.commit();

    await sendOTPEmail(createdUser.email, otpCode);

    Logger.http(`User ${createdUser.id} successfully registered`);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: createdUser.id,
        email: createdUser.email,
        role: createdUser.role,
        user_name: createdUser.user_name,
        phone_number: createdUser.phone_number,
      },
    });
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }
    Logger.error("Registration error", { message: error.message, stack: error.stack, body: req.body });
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const sendOTPEmail = async (email, otpCode) => {
  const template = OTPTemplate(otpCode);
  const success = await sendEmail({ to: email, subject: "HUFF&PUFF User Verification OTP", template });
  Logger.info("OTP email sent", { email });
  return success;
};

module.exports = { createCustomerAuth };
