const { uploadImages, deleteImage } = require('../../Utils/FileUpload');
const Item = require("../../Models/MenuManagement/Item.Model")
const ItemVariant = require("../../Models/MenuManagement/ItemVariant.Model")
const ItemAddon = require("../../Models/MenuManagement/ItemAddon.Model")

// Create item with optional image upload
async function createItem(itemData, req = null) {
  try {
    if (req && req.files?.length) {
      const imageUrls = await uploadImages(req, 'items');
      itemData.image_url = imageUrls[0];
    }

    const item = await Item.create(itemData);
    return item;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
}

// Get all items with filtering options
async function getAllItems(options = {}) {
  try {
    const {
      activeOnly = true,
      categoryId = null,
      vegetarianOnly = false,
      includeVariants = false,
      includeAddons = false,
      limit = 100,
      offset = 0
    } = options;

    const where = {};
    if (activeOnly) where.is_active = true;
    if (categoryId) where.category_id = categoryId;
    if (vegetarianOnly) where.is_vegetarian = true;

    const include = [];
    if (includeVariants) include.push({ model: ItemVariant, as: 'variants' });
    if (includeAddons) include.push({ model: ItemAddon, as: 'addons' });

    const items = await Item.findAll({
      where,
      include,
      limit,
      offset,
      order: [['created_at', 'DESC']]
    });

    return items;
  } catch (error) {
    console.error('Error getting items:', error);
    throw error;
  }
}

// Get item by ID
async function getItemById(itemId, options = {}) {
  try {
    const { includeVariants = false, includeAddons = false } = options;

    const include = [];
    if (includeVariants) include.push({ model: ItemVariant, as: 'variants' });
    if (includeAddons) include.push({ model: ItemAddon, as: 'addons' });

    const item = await Item.findByPk(itemId, {
      include
    });
    
    if (!item) {
      throw new Error('Item not found');
    }

    return item;
  } catch (error) {
    console.error('Error getting item:', error);
    throw error;
  }
}

// Update item
async function updateItem(itemId, updateData, req = null) {
  try {
    const item = await Item.findByPk(itemId);
    
    if (!item) {
      throw new Error('Item not found');
    }

    if (req?.files?.length) {
      if (item.image_url) await deleteImage(item.image_url);
      const imageUrls = await uploadImages(req, 'items');
      updateData.image_url = imageUrls[0];
    }

    await item.update(updateData);
    return item;
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
}

// Delete item (soft delete)
async function deleteItem(itemId) {
  try {
    const item = await Item.findByPk(itemId);
    
    if (!item) {
      throw new Error('Item not found');
    }

    if (item.image_url) {
      await deleteImage(item.image_url);
    }

    await item.update({ is_active: false });
    return { message: 'Item deactivated successfully' };
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
}

// Update item image
async function updateItemImage(itemId, req) {
  try {
    if (!req.files?.length) {
      throw new Error('No image file provided');
    }

    const item = await Item.findByPk(itemId);
    if (!item) {
      throw new Error('Item not found');
    }

    if (item.image_url) {
      await deleteImage(item.image_url);
    }

    const imageUrls = await uploadImages(req, 'items');
    await item.update({ image_url: imageUrls[0] });

    return item;
  } catch (error) {
    console.error('Error updating item image:', error);
    throw error;
  }
}

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  updateItemImage
};