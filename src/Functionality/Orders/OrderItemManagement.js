const OrderItem = require("../../Models/OrderManagement/OrderItem.Model");

// Add item to order
async function addItemToOrder(orderId, itemData) {
  try {
    const item = await OrderItem.create({
      order_id: orderId,
      ...itemData,
    });

    return item;
  } catch (error) {
    console.error("Error adding item to order:", error);
    throw error;
  }
}

// Get order item by ID
async function getOrderItemById(orderItemId) {
  try {
    const item = await OrderItem.findByPk(orderItemId, {
      include: [
        { model: Item, as: "item" },
        { model: ItemVariant, as: "variant" },
        { model: OrderItemAddon, as: "addons" },
      ],
    });

    if (!item) {
      throw new Error("Order item not found");
    }

    return item;
  } catch (error) {
    console.error("Error getting order item:", error);
    throw error;
  }
}

// Update order item
async function updateOrderItem(orderItemId, updateData) {
  try {
    const item = await OrderItem.findByPk(orderItemId);
    if (!item) {
      throw new Error("Order item not found");
    }

    await item.update(updateData);
    return item;
  } catch (error) {
    console.error("Error updating order item:", error);
    throw error;
  }
}

// Remove item from order
async function removeOrderItem(orderItemId) {
  try {
    const item = await OrderItem.findByPk(orderItemId);
    if (!item) {
      throw new Error("Order item not found");
    }

    await item.destroy();
    return { message: "Order item removed successfully" };
  } catch (error) {
    console.error("Error removing order item:", error);
    throw error;
  }
}

module.exports = {
  addItemToOrder,
  getOrderItemById,
  updateOrderItem,
  removeOrderItem,
};
