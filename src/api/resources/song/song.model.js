import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, 'Song must have a title'],
  },
  url: {
    type: String,
    require: [true, 'Song must have a url'],
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
});

songSchema.plugin(paginate);

export default mongoose.model('Song', songSchema);

// export const Song = mongoose.model('Song', songSchema);
