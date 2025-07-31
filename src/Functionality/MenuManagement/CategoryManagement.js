const { uploadImages, deleteImage } = require('../../Utils/FileUpload');
const Category  = require('../../Models/MenuManagement/Category.Model');

// Create category with optional image upload
async function createCategory(categoryData, req = null) {
  try {
    if (req && req.files?.length) {
      const imageUrls = await uploadImages(req, 'categories');
      categoryData.image_url = imageUrls[0];
    }

    const category = await Category.create(categoryData);
    return category;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
}

// Get all categories
async function getAllCategories(options = {}) {
  try {
    const { activeOnly = true, includeItems = false, limit = 100, offset = 0 } = options;

    const include = includeItems ? [{ model: Item, as: 'items' }] : [];
    
    const categories = await Category.findAll({
      where: activeOnly ? { is_active: true } : {},
      include,
      limit,
      offset,
      order: [['display_order', 'ASC'], ['name', 'ASC']]
    });

    return categories;
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
}

// Get category by ID
async function getCategoryById(categoryId, includeItems = false) {
  try {
    const options = {
      where: { id: categoryId }
    };

    if (includeItems) {
      options.include = [{ model: Item, as: 'items' }];
    }

    const category = await Category.findOne(options);
    
    if (!category) {
      throw new Error('Category not found');
    }

    return category;
  } catch (error) {
    console.error('Error getting category:', error);
    throw error;
  }
}

// Update category
async function updateCategory(categoryId, updateData, req = null) {
  try {
    const category = await Category.findByPk(categoryId);
    
    if (!category) {
      throw new Error('Category not found');
    }

    if (req?.files?.length) {
      if (category.image_url) await deleteImage(category.image_url);
      const imageUrls = await uploadImages(req, 'categories');
      updateData.image_url = imageUrls[0];
    }

    await category.update(updateData);
    return category;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
}

// Delete category (soft delete)
async function deleteCategory(categoryId) {
  try {
    const category = await Category.findByPk(categoryId);
    
    if (!category) {
      throw new Error('Category not found');
    }

    if (category.image_url) {
      await deleteImage(category.image_url);
    }

    await category.update({ is_active: false });
    return { message: 'Category deactivated successfully' };
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
}

// Update category image
async function updateCategoryImage(categoryId, req) {
  try {
    if (!req.files?.length) {
      throw new Error('No image file provided');
    }

    const category = await Category.findByPk(categoryId);
    if (!category) {
      throw new Error('Category not found');
    }

    if (category.image_url) {
      await deleteImage(category.image_url);
    }

    const imageUrls = await uploadImages(req, 'categories');
    await category.update({ image_url: imageUrls[0] });

    return category;
  } catch (error) {
    console.error('Error updating category image:', error);
    throw error;
  }
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  updateCategoryImage
};