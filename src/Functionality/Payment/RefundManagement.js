const Payment = require("../../Models/PaymentManagement/Payment.Model");
const Refund = require("../../Models/PaymentManagement/Refund.Model");

// Get refund by ID
async function getRefundById(refundId) {
  try {
    const refund = await Refund.findByPk(refundId, {
      include: [{ model: Payment, as: "payment" }],
    });

    if (!refund) {
      throw new Error("Refund not found");
    }

    return refund;
  } catch (error) {
    console.error("Error getting refund:", error);
    throw error;
  }
}

// Get refunds with filtering options
async function getRefunds(options = {}) {
  try {
    const {
      paymentId = null,
      status = null,
      fromDate = null,
      toDate = null,
      limit = 100,
      offset = 0,
    } = options;

    const where = {};
    if (paymentId) where.payment_id = paymentId;
    if (status) where.status = status;
    if (fromDate || toDate) {
      where.created_at = {};
      if (fromDate) where.created_at[Op.gte] = new Date(fromDate);
      if (toDate) where.created_at[Op.lte] = new Date(toDate);
    }

    const refunds = await Refund.findAll({
      where,
      limit,
      offset,
      order: [["created_at", "DESC"]],
      include: [{ model: Payment, as: "payment" }],
    });

    return refunds;
  } catch (error) {
    console.error("Error getting refunds:", error);
    throw error;
  }
}

// Update refund status
async function updateRefundStatus(
  refundId,
  newStatus,
  refundIdFromGateway = null
) {
  try {
    const refund = await Refund.findByPk(refundId);
    if (!refund) {
      throw new Error("Refund not found");
    }

    const updates = { status: newStatus };
    if (refundIdFromGateway) updates.refund_id = refundIdFromGateway;

    await refund.update(updates);

    // If refund is completed and it's for the full amount, update payment status
    if (newStatus === "completed") {
      const payment = await Payment.findByPk(refund.payment_id);
      if (payment && refund.amount === payment.amount) {
        await payment.update({ status: "refunded" });
        if (payment.order_id) {
          await Order.update(
            { payment_status: "refunded" },
            { where: { id: payment.order_id } }
          );
        }
      }
    }

    return refund;
  } catch (error) {
    console.error("Error updating refund status:", error);
    throw error;
  }
}

// Complete refund (mark as completed)
async function completeRefund(refundId, refundIdFromGateway) {
  try {
    return await updateRefundStatus(refundId, "completed", refundIdFromGateway);
  } catch (error) {
    console.error("Error completing refund:", error);
    throw error;
  }
}

// Fail refund (mark as failed)
async function failRefund(refundId) {
  try {
    return await updateRefundStatus(refundId, "failed");
  } catch (error) {
    console.error("Error failing refund:", error);
    throw error;
  }
}

module.exports = {
  getRefundById,
  getRefunds,
  updateRefundStatus,
  completeRefund,
  failRefund,
};
