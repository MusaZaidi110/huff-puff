const Payment = require("../../Models/PaymentManagement/Payment.Model");
const Refund = require("../../Models/PaymentManagement/Refund.Model");
const Order = require("../../Models/OrderManagement/Order.Model");

// Create a new payment record
async function createPayment(paymentData) {
  try {
    const payment = await Payment.create(paymentData);

    // Update order payment status if order_id is provided
    if (paymentData.order_id) {
      await Order.update(
        { payment_status: payment.status },
        { where: { id: paymentData.order_id } }
      );
    }

    return payment;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
}

// Get payment by ID
async function getPaymentById(paymentId) {
  try {
    const payment = await Payment.findByPk(paymentId, {
      include: [
        { model: Order, as: "order" },
        { model: Refund, as: "refund" },
      ],
    });

    if (!payment) {
      throw new Error("Payment not found");
    }

    return payment;
  } catch (error) {
    console.error("Error getting payment:", error);
    throw error;
  }
}

// Get payments with filtering options
async function getPayments(options = {}) {
  try {
    const {
      orderId = null,
      status = null,
      paymentMethod = null,
      fromDate = null,
      toDate = null,
      limit = 100,
      offset = 0,
    } = options;

    const where = {};
    if (orderId) where.order_id = orderId;
    if (status) where.status = status;
    if (paymentMethod) where.payment_method = paymentMethod;
    if (fromDate || toDate) {
      where.created_at = {};
      if (fromDate) where.created_at[Op.gte] = new Date(fromDate);
      if (toDate) where.created_at[Op.lte] = new Date(toDate);
    }

    const payments = await Payment.findAll({
      where,
      limit,
      offset,
      order: [["created_at", "DESC"]],
      include: [{ model: Order, as: "order" }],
    });

    return payments;
  } catch (error) {
    console.error("Error getting payments:", error);
    throw error;
  }
}

// Update payment status
async function updatePaymentStatus(paymentId, newStatus, transactionId = null) {
  try {
    const payment = await Payment.findByPk(paymentId);
    if (!payment) {
      throw new Error("Payment not found");
    }

    const updates = { status: newStatus };
    if (transactionId) updates.transaction_id = transactionId;

    await payment.update(updates);

    // Update associated order payment status if exists
    if (payment.order_id) {
      await Order.update(
        { payment_status: newStatus },
        { where: { id: payment.order_id } }
      );
    }

    return payment;
  } catch (error) {
    console.error("Error updating payment status:", error);
    throw error;
  }
}

// Complete payment (mark as completed)
async function completePayment(paymentId, transactionId) {
  try {
    return await updatePaymentStatus(paymentId, "completed", transactionId);
  } catch (error) {
    console.error("Error completing payment:", error);
    throw error;
  }
}

// Fail payment (mark as failed)
async function failPayment(paymentId) {
  try {
    return await updatePaymentStatus(paymentId, "failed");
  } catch (error) {
    console.error("Error failing payment:", error);
    throw error;
  }
}

// Process refund for a payment
async function processRefund(paymentId, refundData) {
  try {
    const payment = await Payment.findByPk(paymentId);
    if (!payment) {
      throw new Error("Payment not found");
    }

    if (payment.status !== "completed") {
      throw new Error("Only completed payments can be refunded");
    }

    if (refundData.amount > payment.amount) {
      throw new Error("Refund amount cannot exceed payment amount");
    }

    // Check if refund already exists
    const existingRefund = await Refund.findOne({
      where: { payment_id: paymentId },
    });
    if (existingRefund) {
      throw new Error("Refund already exists for this payment");
    }

    // Create refund record
    const refund = await Refund.create({
      payment_id: paymentId,
      amount: refundData.amount,
      reason: refundData.reason || null,
    });

    // Update payment status to refunded if full amount is refunded
    if (refundData.amount === payment.amount) {
      await payment.update({ status: "refunded" });
      if (payment.order_id) {
        await Order.update(
          { payment_status: "refunded" },
          { where: { id: payment.order_id } }
        );
      }
    }

    return refund;
  } catch (error) {
    console.error("Error processing refund:", error);
    throw error;
  }
}

module.exports = {
  createPayment,
  getPaymentById,
  getPayments,
  updatePaymentStatus,
  completePayment,
  failPayment,
  processRefund,
};
