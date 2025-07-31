const OrderStatusHistory = require("../../Models/OrderManagement/OrderStatusHistory.Model");

// Get status history for order
async function getOrderStatusHistory(orderId) {
  try {
    const history = await OrderStatusHistory.findAll({
      where: { order_id: orderId },
      order: [["created_at", "ASC"]],
    });

    return history;
  } catch (error) {
    console.error("Error getting order status history:", error);
    throw error;
  }
}

// Add status to order history
async function addOrderStatusHistory(orderId, statusData) {
  try {
    const historyItem = await OrderStatusHistory.create({
      order_id: orderId,
      ...statusData,
    });

    return historyItem;
  } catch (error) {
    console.error("Error adding order status history:", error);
    throw error;
  }
}

module.exports = {
  getOrderStatusHistory,
  addOrderStatusHistory,
};
