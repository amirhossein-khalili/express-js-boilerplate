import User from './user.model.js';

import MainCrudTemplateController from '../class.templates/index.js';

class UserController extends MainCrudTemplateController {}

const selectionUsers = 'firstName lastName email';
const selectionUser = 'firstName lastName email';
const userController = new UserController(selectionUsers, selectionUser, User);

export default userController;
