const fs = require('fs');
const path = require('path');
const sequelize = require('../DatabaseConnection');
const { Sequelize } = require('sequelize');

const models = {};

// Enhanced recursive function with better error handling
function loadModelsRecursively(dirPath) {
  try {
    fs.readdirSync(dirPath).forEach(file => {
      const fullPath = path.join(dirPath, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        loadModelsRecursively(fullPath);
      } else if (
        file.endsWith('.js') && 
        !file.endsWith('index.js') &&
        !file.startsWith('.') // ignore hidden files
      ) {
        try {
          const modelModule = require(fullPath);
          
          // Handle both default exports and named exports
          const model = modelModule.default || modelModule;
          
          // More robust model validation
          if (model && typeof model === 'function' && model.name) {
            // Initialize model if it's a class/function
            const initializedModel = typeof model.init === 'function' 
              ? model 
              : model(sequelize, Sequelize.DataTypes);
              
            models[initializedModel.name] = initializedModel;
          } else if (model && model.name && typeof model === 'object') {
            // Handle already initialized models
            models[model.name] = model;
          }
        } catch (error) {
          console.warn(`Failed to load model from ${fullPath}:`, error.message);
        }
      }
    });
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error.message);
  }
}

// Load models
loadModelsRecursively(__dirname);

// Associate models with error handling
Object.values(models).forEach(model => {
  if (typeof model.associate === 'function') {
    try {
      model.associate(models);
    } catch (error) {
      console.error(`Error associating model ${model.name}:`, error.message);
    }
  }
});

// Sync models (optional - be careful in production)
// sequelize.sync({ alter: true });

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;