import { Router } from 'express';
import ProductController from './product.controller.js';
import validateSchema from '../../../utils.js';
import newProductschema from './product.errorhandler.js';

export const productRouter = Router();

productRouter
  .route('')
  .get(ProductController.findAll)
  .post(validateSchema(newProductschema), ProductController.create);

productRouter
  .route('/:id')
  .get(ProductController.findOne)
  .put(ProductController.edit)
  .delete(ProductController.destroy);
