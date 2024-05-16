import express from 'express';
import songController from './song.controller.js';

export const songRouter = express.Router();

songRouter.route('/').post(songController.create).get(songController.findAll);
// songRouter.route('/:page/:limit').get(songController.findPages);
