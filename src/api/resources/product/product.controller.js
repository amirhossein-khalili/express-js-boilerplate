import Product from './product.model.js';

export default {
  async findAll(req, res) {
    // options for the pagination
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const options = { page: page, limit: limit };
    console.log(options);
    // find products and paginate
    const products = await Product.paginate({}, options);

    // respond to the user
    res.json({ products: products });
  },
  async create(req, res) {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  },
  async find(req, res) {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({
        message: 'The Product was not found',
      });

    res.json(product);
  },
  async edit(req, res) {
    const productUpdated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: false });
    res.json(productUpdated);
  },
  async destroy(req, res) {
    const productRemoved = await Product.findByIdAndDelete(req.params.id);
    res.json(productRemoved);
  },
};
