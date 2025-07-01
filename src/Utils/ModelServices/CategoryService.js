const Category = require("../../Models/MenuManagement/Category.Model");
const Item = require("../../Models/MenuManagement/Item.Model"); // Assuming this exists and is associated

const CategoryService = {
  // Create a new category
  async createCategory(data) {
    return await Category.create(data);
  },

  // Get all categories, optionally filtering by is_active
  async getAllCategories({ activeOnly = false } = {}) {
    const where = activeOnly ? { is_active: true } : {};
    return await Category.findAll({
      where,
      order: [["display_order", "ASC"]],
    });
  },

  // Get a single category by ID
  async getCategoryById(id) {
    const category = await Category.findByPk(id, {
      include: [{ model: Item }],
    });
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  },

  // Update a category by ID
  async updateCategory(id, data) {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new Error("Category not found");
    }
    await category.update(data);
    return category;
  },

  // Soft delete: deactivate a category
  async deactivateCategory(id) {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new Error("Category not found");
    }
    category.is_active = false;
    await category.save();
    return category;
  },

  // Hard delete: permanently remove a category
  async deleteCategory(id) {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new Error("Category not found");
    }
    await category.destroy();
    return { message: "Category deleted successfully" };
  },
};

module.exports = CategoryService;
