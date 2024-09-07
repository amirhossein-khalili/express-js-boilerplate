import Song from './song.model.js';
import MainCrudTemplateController from '../class.templates/controller/mainCrud.template.controller.js';

class SongController extends MainCrudTemplateController {}

const selectionSongs = 'title url rating';
const selectionSong = 'title url rating';
const songController = new SongController(selectionSongs, selectionSong, Song);

export default songController;
