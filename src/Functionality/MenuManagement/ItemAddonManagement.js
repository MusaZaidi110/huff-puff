const ItemAddon  = require('../../Models/MenuManagement/ItemAddon.Model');

// Create item addon
async function createItemAddon(itemId, addonData) {
  try {
    const addon = await ItemAddon.create({
      item_id: itemId,
      ...addonData
    });
    return addon;
  } catch (error) {
    console.error('Error creating item addon:', error);
    throw error;
  }
}

// Get addons for item
async function getItemAddons(itemId) {
  try {
    const addons = await ItemAddon.findAll({
      where: { item_id: itemId },
      order: [['name', 'ASC']]
    });
    return addons;
  } catch (error) {
    console.error('Error getting item addons:', error);
    throw error;
  }
}

// Get addon by ID
async function getAddonById(addonId) {
  try {
    const addon = await ItemAddon.findByPk(addonId);
    if (!addon) {
      throw new Error('Addon not found');
    }
    return addon;
  } catch (error) {
    console.error('Error getting addon:', error);
    throw error;
  }
}

// Update addon
async function updateAddon(addonId, updateData) {
  try {
    const addon = await ItemAddon.findByPk(addonId);
    if (!addon) {
      throw new Error('Addon not found');
    }
    await addon.update(updateData);
    return addon;
  } catch (error) {
    console.error('Error updating addon:', error);
    throw error;
  }
}

// Delete addon
async function deleteAddon(addonId) {
  try {
    const addon = await ItemAddon.findByPk(addonId);
    if (!addon) {
      throw new Error('Addon not found');
    }
    await addon.destroy();
    return { message: 'Addon deleted successfully' };
  } catch (error) {
    console.error('Error deleting addon:', error);
    throw error;
  }
}

module.exports = {
  createItemAddon,
  getItemAddons,
  getAddonById,
  updateAddon,
  deleteAddon
};