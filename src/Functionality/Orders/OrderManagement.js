const Order = require("../../Models/OrderManagement/Order.Model");
const OrderItem = require("../../Models/OrderManagement/OrderItem.Model");
const OrderStatusHistory = require("../../Models/OrderManagement/OrderStatusHistory.Model");

// Create a new order
async function createOrder(orderData) {
  try {
    const order = await Order.create(orderData, {
      include: [
        { model: OrderItem, as: "items" },
        { model: OrderStatusHistory, as: "statusHistory" },
      ],
    });

    // Create initial status history
    await OrderStatusHistory.create({
      order_id: order.id,
      status: "pending",
      notes: "Order created",
    });

    return order;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

// Get order by ID
async function getOrderById(orderId, options = {}) {
  try {
    const include = [
      { model: OrderItem, as: "items", include: ["addons"] },
      { model: OrderStatusHistory, as: "statusHistory" },
    ];

    if (options.includeCustomer) {
      include.push({ model: Customer, as: "customer" });
    }

    const order = await Order.findByPk(orderId, {
      include,
    });

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  } catch (error) {
    console.error("Error getting order:", error);
    throw error;
  }
}

// Get orders with filtering options
async function getOrders(options = {}) {
  try {
    const {
      customerId = null,
      status = null,
      branchId = null,
      fromDate = null,
      toDate = null,
      limit = 100,
      offset = 0,
    } = options;

    const where = {};
    if (customerId) where.customer_id = customerId;
    if (status) where.status = status;
    if (branchId) where.branch_id = branchId;
    if (fromDate || toDate) {
      where.created_at = {};
      if (fromDate) where.created_at[Op.gte] = new Date(fromDate);
      if (toDate) where.created_at[Op.lte] = new Date(toDate);
    }

    const orders = await Order.findAll({
      where,
      limit,
      offset,
      order: [["created_at", "DESC"]],
      include: [
        { model: OrderItem, as: "items" },
        { model: Branch, as: "branch" },
      ],
    });

    return orders;
  } catch (error) {
    console.error("Error getting orders:", error);
    throw error;
  }
}

// Update order status
async function updateOrderStatus(
  orderId,
  newStatus,
  staffId = null,
  notes = ""
) {
  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    // Validate status transition
    const validTransitions = {
      pending: ["accepted", "cancelled"],
      accepted: ["preparing", "cancelled"],
      preparing: ["ready", "cancelled"],
      ready: ["out_for_delivery"],
      out_for_delivery: ["delivered"],
      delivered: [],
      cancelled: [],
    };

    if (!validTransitions[order.status].includes(newStatus)) {
      throw new Error(
        `Invalid status transition from ${order.status} to ${newStatus}`
      );
    }

    // Update order status
    await order.update({ status: newStatus });

    // Record status history
    await OrderStatusHistory.create({
      order_id: orderId,
      status: newStatus,
      staff_id: staffId,
      notes,
    });

    // Handle special timestamps
    const updates = {};
    if (newStatus === "out_for_delivery") {
      updates.delivery_started_at = new Date();
    } else if (newStatus === "delivered") {
      updates.delivered_at = new Date();
    }

    if (Object.keys(updates).length > 0) {
      await order.update(updates);
    }

    return order;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
}

// Cancel order
async function cancelOrder(orderId, staffId = null, reason = "") {
  try {
    return await updateOrderStatus(
      orderId,
      "cancelled",
      staffId,
      reason || "Order cancelled"
    );
  } catch (error) {
    console.error("Error cancelling order:", error);
    throw error;
  }
}

// Calculate order totals
async function calculateOrderTotals(orderId) {
  try {
    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: OrderItem,
          as: "items",
          include: ["addons"],
        },
      ],
    });

    if (!order) {
      throw new Error("Order not found");
    }

    let subtotal = 0;
    let itemCount = 0;

    // Calculate subtotal from items and addons
    order.items.forEach((item) => {
      const itemTotal = item.unit_price * item.quantity;
      subtotal += itemTotal;
      itemCount += item.quantity;

      if (item.addons && item.addons.length > 0) {
        item.addons.forEach((addon) => {
          subtotal += addon.unit_price * addon.quantity;
        });
      }
    });

    // Apply promotion discount if exists
    const discountAmount = order.promotionDiscount || 0;
    const tax = calculateTax(subtotal - discountAmount);
    const total = subtotal - discountAmount + tax + (order.delivery_fee || 0);

    await order.update({
      subtotal,
      tax,
      total_amount: total,
      discount_amount: discountAmount,
    });

    return order;
  } catch (error) {
    console.error("Error calculating order totals:", error);
    throw error;
  }
}

// Helper function for tax calculation
function calculateTax(subtotal) {
  // Implement your tax calculation logic
  return subtotal * 0.1; // Example: 10% tax
}

module.exports = {
  createOrder,
  getOrderById,
  getOrders,
  updateOrderStatus,
  cancelOrder,
  calculateOrderTotals,
};
