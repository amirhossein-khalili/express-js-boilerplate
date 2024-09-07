import { Router } from 'express';
import userController from './user.controller.js';
import UserMiddleware from './user.middleware.js';

import passport from 'passport';

class UserRouter {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router
      .route('/')
      .get(
        passport.authenticate('jwt', { session: false }),
        userController.findAll.bind(userController)
      )
      .post(
        passport.authenticate('jwt', { session: false }),
        UserMiddleware.checkUnique,
        userController.create.bind(userController)
      );

    this.router
      .route('/:id')
      .get(
        passport.authenticate('jwt', { session: false }),
        userController.findOne.bind(userController)
      )
      .patch(
        passport.authenticate('jwt', { session: false }),
        userController.edit.bind(userController)
      )
      .delete(
        passport.authenticate('jwt', { session: false }),
        userController.destroy.bind(userController)
      );
  }
}

export default new UserRouter().router;
