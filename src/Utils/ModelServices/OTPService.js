const OTP = require("../../Models/UserManagement/OTP.Model");

const OTPService = {
  // Create a new OTP record
  async create({ OTP: otpValue, OTP_type, user_id }) {
    return await OTP.create({
      OTP: otpValue,
      OTP_type,
      user_id,
      is_used: false,
    });
  },

  // Find OTP by ID
  async findById(id) {
    return await OTP.findByPk(id);
  },

  // Find latest valid OTP for a user by type that is not used and not expired (assuming createdAt expiration logic)
  async findValidByUserAndType(user_id, OTP_type, expiryMinutes = 10) {
    const expiryDate = new Date(Date.now() - expiryMinutes * 60000);
    return await OTP.findOne({
      where: {
        user_id,
        OTP_type,
        is_used: false,
        created_at: { [OTP.sequelize.Op.gte]: expiryDate },
      },
      order: [["created_at", "DESC"]],
    });
  },

  // Mark OTP as used
  async markUsed(id) {
    const otpRecord = await OTP.findByPk(id);
    if (!otpRecord) throw new Error("OTP record not found");
    otpRecord.is_used = true;
    await otpRecord.save();
    return otpRecord;
  },

  // Delete expired or used OTPs (optional cleanup)
  async deleteExpired(expiryMinutes = 60) {
    const expiryDate = new Date(Date.now() - expiryMinutes * 60000);
    return await OTP.destroy({
      where: {
        [OTP.sequelize.Op.or]: [
          { is_used: true },
          { created_at: { [OTP.sequelize.Op.lt]: expiryDate } },
        ],
      },
    });
  },
};

module.exports = OTPService;
