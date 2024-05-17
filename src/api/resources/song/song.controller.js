import Song from './song.model.js';

class SongController {
  static async create(req, res, next) {
    try {
      const newSong = new Song(req.body);
      await newSong.save();
      res.status(201).json(newSong);
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }

  static async findAll(req, res, next) {
    try {
      // const songs = await Song.paginate({}, options);
      const songs = await Song.paginate();

      return res.json(songs);
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }
}

export default SongController;
