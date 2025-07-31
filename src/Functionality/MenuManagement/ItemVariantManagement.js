const ItemVariant  = require('../../Models/MenuManagement/ItemVariant.Model');

// Create item variant
async function createItemVariant(itemId, variantData) {
  try {
    const variant = await ItemVariant.create({
      item_id: itemId,
      ...variantData
    });
    return variant;
  } catch (error) {
    console.error('Error creating item variant:', error);
    throw error;
  }
}

// Get variants for item
async function getItemVariants(itemId) {
  try {
    const variants = await ItemVariant.findAll({
      where: { item_id: itemId },
      order: [['name', 'ASC']]
    });
    return variants;
  } catch (error) {
    console.error('Error getting item variants:', error);
    throw error;
  }
}

// Get variant by ID
async function getVariantById(variantId) {
  try {
    const variant = await ItemVariant.findByPk(variantId);
    if (!variant) {
      throw new Error('Variant not found');
    }
    return variant;
  } catch (error) {
    console.error('Error getting variant:', error);
    throw error;
  }
}

// Update variant
async function updateVariant(variantId, updateData) {
  try {
    const variant = await ItemVariant.findByPk(variantId);
    if (!variant) {
      throw new Error('Variant not found');
    }
    await variant.update(updateData);
    return variant;
  } catch (error) {
    console.error('Error updating variant:', error);
    throw error;
  }
}

// Delete variant
async function deleteVariant(variantId) {
  try {
    const variant = await ItemVariant.findByPk(variantId);
    if (!variant) {
      throw new Error('Variant not found');
    }
    await variant.destroy();
    return { message: 'Variant deleted successfully' };
  } catch (error) {
    console.error('Error deleting variant:', error);
    throw error;
  }
}

module.exports = {
  createItemVariant,
  getItemVariants,
  getVariantById,
  updateVariant,
  deleteVariant
};