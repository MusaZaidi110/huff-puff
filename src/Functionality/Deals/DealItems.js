const Deal = require("../../Models/DealManagement/Deal.Model");
const DealItem = require("../../Models/DealManagement/DealItem.Model");

// Add item to deal
async function addItemToDeal(dealId, itemData) {
  try {
    const deal = await Deal.findByPk(dealId);
    if (!deal) {
      throw new Error("Deal not found");
    }

    const dealItem = await DealItem.create({
      deal_id: dealId,
      ...itemData,
    });

    return dealItem;
  } catch (error) {
    console.error("Error adding item to deal:", error);
    throw error;
  }
}

// Get all items for a deal
async function getDealItems(dealId) {
  try {
    const dealItems = await DealItem.findAll({
      where: { deal_id: dealId },
      include: [
        { model: Item, as: "item" },
        { model: ItemVariant, as: "variant" },
        { model: ItemAddon, as: "addon" },
      ],
      order: [
        ["item_type", "ASC"],
        ["created_at", "ASC"],
      ],
    });

    return dealItems;
  } catch (error) {
    console.error("Error getting deal items:", error);
    throw error;
  }
}

// Update deal item
async function updateDealItem(dealItemId, updateData) {
  try {
    const dealItem = await DealItem.findByPk(dealItemId);

    if (!dealItem) {
      throw new Error("Deal item not found");
    }

    await dealItem.update(updateData);
    return dealItem;
  } catch (error) {
    console.error("Error updating deal item:", error);
    throw error;
  }
}

// Remove item from deal
async function removeItemFromDeal(dealItemId) {
  try {
    const dealItem = await DealItem.findByPk(dealItemId);

    if (!dealItem) {
      throw new Error("Deal item not found");
    }

    await dealItem.destroy();
    return { message: "Item removed from deal successfully" };
  } catch (error) {
    console.error("Error removing item from deal:", error);
    throw error;
  }
}

module.exports = {
  addItemToDeal,
  getDealItems,
  updateDealItem,
  removeItemFromDeal,
};
