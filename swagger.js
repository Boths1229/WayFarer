import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  info: {
    title: 'REST API for WayFarer App',
    version: '1.0.0',
    description: 'This is the REST API for my Andela challenge project',
  },
  host: 'localhost:5000',
  basePath: '/api',
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['../docs/**/*.yaml'],
};
// initialize swagger-jsdoc
export default swaggerJSDoc(options);