import { Router } from 'express';
import SongController from './song.controller.js';
import validateSchema from '../../../utils.js';
import newSongSchema from './song.errorhandler.js';

export const songRouter = Router();

songRouter
  .route('')
  .get(SongController.findAll)
  .post(validateSchema(newSongSchema), SongController.create);

// songRouter
//   .route('/:id')
//   .get(SongController.find)
//   .put(SongController.edit)
//   .delete(SongController.destroy);
