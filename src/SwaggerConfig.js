const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const fs = require('fs');

// Recursively get all .js files from a directory
const getFilesFromDirectory = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getFilesFromDirectory(filePath, fileList);
    } else if (filePath.endsWith('.js')) {
      fileList.push(filePath);
    }
  });

  return fileList;
};

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Comprehensive API documentation for the Huff & Puff Restaurants',
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Development server',
      },{
        url: 'https://huff-puff-production.up.railway.app/',
        description: "Testing Server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [
    ...getFilesFromDirectory(path.join(__dirname, './Docs')), // 👈 Only Docs folder
  ],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customSiteTitle: 'API Documentation',
    customCss: '.swagger-ui .topbar { display: none }',
  }));

   app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
};
