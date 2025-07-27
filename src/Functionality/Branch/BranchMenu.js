const BranchMenu = require("../../Models/BranchManagement/BranchMenu.Model");

async function upsertBranchMenuItem(branchId, itemId, menuData = {}) {
  try {
    const [branchMenuItem, created] = await BranchMenu.findOrCreate({
      where: { branch_id: branchId, item_id: itemId },
      defaults: menuData,
    });

    if (!created) {
      await branchMenuItem.update(menuData);
    }

    return branchMenuItem;
  } catch (error) {
    console.error("Error upserting branch menu item:", error);
    throw error;
  }
}


async function getBranchMenu(branchId, options = {}) {
  try {
    const { availableOnly = true } = options;
    
    const where = { branch_id: branchId };
    if (availableOnly) where.is_available = true;

    const menu = await BranchMenu.findAll({
      where,
      include: [{ model: Item, as: 'item' }],
      order: [[{ model: Item, as: 'item' }, 'name', 'ASC']]
    });

    return menu;
  } catch (error) {
    console.error('Error getting branch menu:', error);
    throw error;
  }
}


async function toggleMenuItemAvailability(branchId, itemId) {
  try {
    const menuItem = await BranchMenu.findOne({
      where: { branch_id: branchId, item_id: itemId }
    });
    
    if (!menuItem) {
      throw new Error('Menu item not found in this branch');
    }

    await menuItem.update({ is_available: !menuItem.is_available });
    return menuItem;
  } catch (error) {
    console.error('Error toggling menu item availability:', error);
    throw error;
  }
}


module.exports = {
  upsertBranchMenuItem,
  getBranchMenu,
  toggleMenuItemAvailability};
