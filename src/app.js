import express from 'express';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerConfig from './config/swagger.js';
import { connect } from './config/db.js';
import { restRouter } from './api/index.js';

const app = express();

class Server {
  constructor() {
    this.initDB();
    this.initViewEngin();
    this.initExpressMiddleware();
    this.initRoutes();
    this.initSwagger();
    this.start();
  }

  start() {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
  }

  initViewEngin() {}

  initExpressMiddleware() {
    //middleware and other settings of project app
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }

  initRoutes() {
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
  }

  initDB() {
    connect(); //connect express app to database
  }

  initSwagger() {
    // Swagger setup
    const swaggerOptions = {
      swaggerDefinition: swaggerConfig,
      apis: ['./api/resources/*/*.swagger.yaml'],
    };
    const swaggerSpec = swaggerJsdoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }
}

new Server();
