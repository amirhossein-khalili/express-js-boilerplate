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
      .get(songController.findAll.bind(songController))
      .post(validateSchema(newSongSchema), songController.create.bind(songController));

    this.router
      .route('/:id')
      .get(songController.findOne.bind(songController))
      .patch(validateSchema(newSongSchema), songController.edit.bind(songController))
      .delete(songController.destroy.bind(songController));
  }
}

export default new SongRouter().router;
