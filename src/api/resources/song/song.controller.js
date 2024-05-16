import Joi from 'joi';
import Song from './song.model.js';

export default {
  async create(req, res, next) {
    try {
      const schema = Joi.object().keys({
        title: Joi.string().required(),
        url: Joi.string().required(),
        rating: Joi.number().integer().min(0).max(5).optional(),
      });
      const { value, error } = schema.validate(req.body);
      if (error && error.details) return res.status(400).json(error);

      const song = await Song.create(value);
      return res.json(song);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  },

  async findAll(req, res, next) {
    try {
      const options = {
        page: 1,
        limit: 10,
        collation: {
          local: 'en',
        },
      };

      let songs;

      const test = await Song.paginate({}, options);

      return res.json(songs);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  },
};

// async findPages(req, res, next) {
//   try {
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json(error);
//   }
// },
