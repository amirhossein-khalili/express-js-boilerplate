import express from 'express';
import { songRouter } from './resources/song/song.router.js';

export const restRouter = express.Router();
restRouter.use('/songs', songRouter);
