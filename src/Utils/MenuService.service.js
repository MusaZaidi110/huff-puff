class MenuService {
  constructor(models, sequelize) {
    this.models = models;
    this.sequelize = sequelize;
  }

  async createCategory(data) {
    return this.models.Category.create(data);
  }

  async getAllCategoriesWithItems() {
    return this.models.Category.findAll({
      include: {
        model: this.models.Item,
        where: { is_active: true },
        required: false,
        include: [
          { model: this.models.ItemVariant, required: false },
          { model: this.models.ItemAddon, required: false },
        ],
      },
    });
  }

  async createItemWithVariantsAndAddons(itemData, variants = [], addons = []) {
    return await this.sequelize.transaction(async (t) => {
      const item = await this.models.Item.create(itemData, { transaction: t });

      if (variants.length > 0) {
        await this.models.ItemVariant.bulkCreate(
          variants.map((v) => ({ ...v, item_id: item.id })),
          { transaction: t }
        );
      }

      if (addons.length > 0) {
        await this.models.ItemAddon.bulkCreate(
          addons.map((a) => ({ ...a, item_id: item.id })),
          { transaction: t }
        );
      }

      return item;
    });
  }

  // More methods: updateItem, deleteItem, toggleCategoryStatus etc.
}
