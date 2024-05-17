import { Router } from 'express';
import productController from './product.controller.js';
export const productRouter = Router();

productRouter.get('', productController.findAll);
productRouter.post('', productController.create);
productRouter.get('/:id', productController.find);
productRouter.put('/:id', productController.edit);
productRouter.delete('/:id', productController.destroy);

// export default productRouter;
