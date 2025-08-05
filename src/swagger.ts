import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerDoc = swaggerJSDoc({
  failOnErrors: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'node-ts-url-shortener',
      version: '1.0.0',
      description: 'node-ts-url-shortener docs'
    },
    externalDocs: {
      description: 'OpenAPI Specification',
      url: 'https://swagger.io/specification/v3/'
    }
  },
  apis: [`${__dirname}/routes/**/**.ts`]
});
