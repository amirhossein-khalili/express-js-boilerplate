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
      .get(passport.authenticate('jwt', { session: false }), userController.findAll)
      .post(
        passport.authenticate('jwt', { session: false }),
        UserMiddleware.checkUnique,
        userController.create
      );

    this.router
      .route('/:id')
      .get(passport.authenticate('jwt', { session: false }), userController.findOne)
      .patch(passport.authenticate('jwt', { session: false }), userController.edit)
      .delete(passport.authenticate('jwt', { session: false }), userController.destroy);
  }
}

export default new UserRouter().router;
