import autoBind from 'auto-bind';

class MainCrudTemplateController {
  constructor(selectionAll, selectionOne, Model) {
    autoBind(this);
    this.selectionAll = selectionAll;
    this.selectionOne = selectionOne;
    this.model = Model;
  }

  async findAll(req, res) {
    try {
      const { page, perPage } = req.query;
      const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 10,
        select: this.selectionAll,
      };

      const items = await this.model.paginate({}, options);

      return res.json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }

  async findOne(req, res) {
    try {
      const item = await this.model.findById(req.params.id).select(this.selectionOne);
      if (!item) return res.status(404).json({ message: 'item not found ' });
      return res.json(item);
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }

  async create(req, res) {
    try {
      const newItem = new this.model(req.body);
      await newItem.save();
      res.status(201).json(newItem);
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }

  async edit(req, res) {
    try {
      const itemUpdated = await this.model.findByIdAndUpdate(req.params.id, req.body, {
        new: false,
      });
      if (!itemUpdated) return res.status(404).json({ message: 'item not found ' });

      return res.json(itemUpdated);
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }

  async destroy(req, res) {
    try {
      const itemRemoved = await this.model.findByIdAndDelete(req.params.id);
      if (!itemRemoved) return res.status(404).json({ message: 'item not found ' });
      res.json(itemRemoved);
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }
}

export default MainCrudTemplateController;
