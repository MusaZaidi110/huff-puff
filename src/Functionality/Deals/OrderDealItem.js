const OrderDealItem = require("../../Models/DealManagement/OrderDealItem.Model");
const DealItem = require("../../Models/DealManagement/DealItem.Model");

// Create order deal item
async function createOrderDealItem(orderItemId, dealItemData) {
  try {
    const orderDealItem = await OrderDealItem.create({
      order_item_id: orderItemId,
      ...dealItemData,
    });

    return orderDealItem;
  } catch (error) {
    console.error("Error creating order deal item:", error);
    throw error;
  }
}

// Get order deal items for an order item
async function getOrderDealItems(orderItemId) {
  try {
    const orderDealItems = await OrderDealItem.findAll({
      where: { order_item_id: orderItemId },
      include: [
        { model: DealItem, as: "dealItem" },
        { model: Item, as: "item" },
        { model: ItemVariant, as: "variant" },
        { model: ItemAddon, as: "addon" },
      ],
    });

    return orderDealItems;
  } catch (error) {
    console.error("Error getting order deal items:", error);
    throw error;
  }
}

// Update order deal item
async function updateOrderDealItem(orderDealItemId, updateData) {
  try {
    const orderDealItem = await OrderDealItem.findByPk(orderDealItemId);

    if (!orderDealItem) {
      throw new Error("Order deal item not found");
    }

    await orderDealItem.update(updateData);
    return orderDealItem;
  } catch (error) {
    console.error("Error updating order deal item:", error);
    throw error;
  }
}

// Remove order deal item
async function removeOrderDealItem(orderDealItemId) {
  try {
    const orderDealItem = await OrderDealItem.findByPk(orderDealItemId);

    if (!orderDealItem) {
      throw new Error("Order deal item not found");
    }

    await orderDealItem.destroy();
    return { message: "Order deal item removed successfully" };
  } catch (error) {
    console.error("Error removing order deal item:", error);
    throw error;
  }
}

module.exports = {
  createOrderDealItem,
  getOrderDealItems,
  updateOrderDealItem,
  removeOrderDealItem,
};
