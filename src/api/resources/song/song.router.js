import { Router } from 'express';
import songController from './song.controller.js';
import validateSchema from '../../../utils/validateSchema.utils.js';
import newSongSchema from './song.validation.js';

class SongRouter {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router
      .route('/')
      .get(songController.findAll)
      .post(validateSchema(newSongSchema), songController.create);

    this.router
      .route('/:id')
      .get(songController.findOne)
      .patch(validateSchema(newSongSchema), songController.edit)
      .delete(songController.destroy);
  }
}

export default new SongRouter().router;
