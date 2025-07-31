const OrderItemAddon = require("../../Models/OrderManagement/OrderItemAddon.Model");
const ItemAddon = require("../../Models/MenuManagement/ItemAddon.Model");

// Add addon to order item
async function addAddonToOrderItem(orderItemId, addonData) {
  try {
    const addon = await OrderItemAddon.create({
      order_item_id: orderItemId,
      ...addonData,
    });

    return addon;
  } catch (error) {
    console.error("Error adding addon to order item:", error);
    throw error;
  }
}

// Get order item addon by ID
async function getOrderItemAddonById(addonId) {
  try {
    const addon = await OrderItemAddon.findByPk(addonId, {
      include: [{ model: ItemAddon, as: "addon" }],
    });

    if (!addon) {
      throw new Error("Order item addon not found");
    }

    return addon;
  } catch (error) {
    console.error("Error getting order item addon:", error);
    throw error;
  }
}

// Update order item addon
async function updateOrderItemAddon(addonId, updateData) {
  try {
    const addon = await OrderItemAddon.findByPk(addonId);
    if (!addon) {
      throw new Error("Order item addon not found");
    }

    await addon.update(updateData);
    return addon;
  } catch (error) {
    console.error("Error updating order item addon:", error);
    throw error;
  }
}

// Remove addon from order item
async function removeOrderItemAddon(addonId) {
  try {
    const addon = await OrderItemAddon.findByPk(addonId);
    if (!addon) {
      throw new Error("Order item addon not found");
    }

    await addon.destroy();
    return { message: "Order item addon removed successfully" };
  } catch (error) {
    console.error("Error removing order item addon:", error);
    throw error;
  }
}

module.exports = {
  addAddonToOrderItem,
  getOrderItemAddonById,
  updateOrderItemAddon,
  removeOrderItemAddon,
};
