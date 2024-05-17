import express from 'express';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerConfig from './config/swagger.js';
import { connect } from './config/db.js';
import { restRouter } from './api/index.js';

const app = express();
connect(); //connect express app to database

//middleware and other settings of project app
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: swaggerConfig,
  apis: ['path/to/your/swagger-spec.yaml'], // Path to your Swagger/OpenAPI specification file
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//api and main routes
app.use('/api', restRouter);
app.get('/', (req, res) => {
  res.send({ message: 'welcome to the our application' });
});
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.message = 'Invalid route';
  error.status = 404;
  next(error);
});
app.use((req, res, next) => {
  res.status(error.status || 500);
  return res.json({ error: { message: error.message } });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
