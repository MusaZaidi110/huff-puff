'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categoriesData = [
      {
        name: 'Nuggets',
        description: 'Crispy chicken nuggets in various flavors',
        image_url: '/Media_Assets/categories/nuggets.jpg',
        display_order: 1
      },
      {
        name: 'Family Packages',
        description: 'Meal deals perfect for the whole family',
        image_url: '/Media_Assets/categories/family-packages.jpg',
        display_order: 2
      },
      {
        name: 'APPETIZERS',
        description: 'Delicious starters to begin your meal',
        image_url: '/Media_Assets/categories/appetizers.jpg',
        display_order: 3
      },
      {
        name: 'BURGERS',
        description: 'Juicy burgers with various toppings',
        image_url: '/Media_Assets/categories/burgers.jpg',
        display_order: 4
      },
      {
        name: 'Shrimp',
        description: 'Fresh shrimp prepared in multiple styles',
        image_url: '/Media_Assets/categories/shrimp.jpg',
        display_order: 5
      },
      {
        name: 'HOT DOG',
        description: 'Classic and gourmet hot dogs',
        image_url: '/Media_Assets/categories/hot-dog.jpg',
        display_order: 6
      },
      {
        name: 'Kashta',
        description: 'Traditional Middle Eastern desserts',
        image_url: '/Media_Assets/categories/kashta.jpg',
        display_order: 7
      },
      {
        name: 'SLIDERS',
        description: 'Mini burgers perfect for sampling',
        image_url: '/Media_Assets/categories/sliders.jpg',
        display_order: 8
      },
      {
        name: 'FRIES',
        description: 'Crispy fries with various seasonings',
        image_url: '/Media_Assets/categories/fries.jpg',
        display_order: 9
      },
      {
        name: 'Buffalos',
        description: 'Spicy buffalo-style dishes',
        image_url: '/Media_Assets/categories/buffalos.jpg',
        display_order: 10
      },
      {
        name: 'Drink',
        description: 'Refreshing beverages',
        image_url: '/Media_Assets/categories/drinks.jpg',
        display_order: 11
      },
      {
        name: 'MOJITOS',
        description: 'Fresh mint cocktails',
        image_url: '/Media_Assets/categories/mojitos.jpg',
        display_order: 12
      },
      {
        name: 'KIDS',
        description: 'Special meals for children',
        image_url: '/Media_Assets/categories/kids.jpg',
        display_order: 13
      },
      {
        name: 'SIDE EXTRAS',
        description: 'Additional sides and add-ons',
        image_url: '/Media_Assets/categories/side-extras.jpg',
        display_order: 14
      }
    ];

    const transformedCategories = categoriesData.map((category, index) => ({
      id: uuidv4(),
      name: category.name,
      description: category.description,
      image_url: category.image_url,
      is_active: true,
      display_order: category.display_order || index + 1,
      created_at: new Date(),
      updated_at: new Date()
    }));

    await queryInterface.bulkInsert('categories', transformedCategories);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  }
};