import express from 'express';
import { songRouter } from './resources/song/song.router.js';
import { productRouter } from './resources/product/product.router.js';

export const restRouter = express.Router();
restRouter.use('/songs', songRouter);
restRouter.use('/products', productRouter);
