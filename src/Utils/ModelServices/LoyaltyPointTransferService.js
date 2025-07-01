const LoyaltyPointTransfer = require("../../Models/LoyaltySystem/LoyaltyPointsTransaction.Model");

const LoyaltyPointTransferService = {
  // Create a new transfer request
  async create(data) {
    return await LoyaltyPointTransfer.create(data);
  },

  // Get all transfers (optionally filter by sender/receiver)
  async getAll(filter = {}) {
    const where = {};
    if (filter.sender_id) where.sender_id = filter.sender_id;
    if (filter.receiver_id) where.receiver_id = filter.receiver_id;
    if (filter.is_accepted !== undefined) where.is_accepted = filter.is_accepted;

    return await LoyaltyPointTransfer.findAll({
      where,
      order: [['created_at', 'DESC']],
    });
  },

  // Get a transfer by its ID
  async getById(id) {
    return await LoyaltyPointTransfer.findByPk(id);
  },

  // Update a transfer
  async update(id, data) {
    const transfer = await LoyaltyPointTransfer.findByPk(id);
    if (!transfer) throw new Error("LoyaltyPointTransfer not found");
    return await transfer.update(data);
  },

  // Delete a transfer
  async delete(id) {
    const transfer = await LoyaltyPointTransfer.findByPk(id);
    if (!transfer) throw new Error("LoyaltyPointTransfer not found");
    await transfer.destroy();
    return { message: "Transfer deleted successfully" };
  },

  // Mark a transfer as accepted
  async acceptTransfer(id) {
    const transfer = await LoyaltyPointTransfer.findByPk(id);
    if (!transfer) throw new Error("LoyaltyPointTransfer not found");

    if (transfer.is_accepted) {
      throw new Error("Transfer already accepted");
    }

    transfer.is_accepted = true;
    await transfer.save();

    return transfer;
  },

  // Get all transfers related to a specific customer (as sender or receiver)
  async getTransfersByCustomer(customerId) {
    return await LoyaltyPointTransfer.findAll({
      where: {
        [Op.or]: [
          { sender_id: customerId },
          { receiver_id: customerId },
        ],
      },
      order: [['created_at', 'DESC']],
    });
  },
};

module.exports = LoyaltyPointTransferService;
