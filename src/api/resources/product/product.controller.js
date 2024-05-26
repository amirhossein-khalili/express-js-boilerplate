import Product from './product.model.js';
class ProductController {
  static async findAll(req, res) {
    try {
      // Options for pagination
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const options = { page: page, limit: limit };

      // Find products and paginate
      const products = await Product.paginate({}, options);

      // Respond to the user
      res.json({ products });
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }

  static async create(req, res) {
    try {
      const newProduct = new Product(req.body);
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }

  static async findOne(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product)
        return res.status(404).json({
          message: 'The Product was not found',
        });
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }

  static async edit(req, res) {
    try {
      const productUpdated = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: false,
      });
      res.json(productUpdated);
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }

  static async destroy(req, res) {
    try {
      const productRemoved = await Product.findByIdAndDelete(req.params.id);
      res.json(productRemoved);
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }
}

export default ProductController;
