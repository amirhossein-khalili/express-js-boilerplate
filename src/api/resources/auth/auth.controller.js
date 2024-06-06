import User from '../user/user.model.js';
import AuthService from './auth.service.js';

class AuthController {
  static async signup(req, res, next) {
    try {
      const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: AuthService.encryptPassword(req.body.password),
      });

      res.status(201).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }

  static async login(req, res, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const user = await User.findOne({ email: email });
      if (!user) return res.status(401).send({ message: 'please try signup first' });

      const authenticated = AuthService.compatePassword(password, user.password);
      if (!authenticated) return res.status(401).send({ message: 'invalid password' });

      const token = AuthService.generateToken(user);
      res.status(201).json({ success: true, token: token });
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }

  static async findAll(req, res, next) {
    try {
      const { page, perPage } = req.query;
      const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 10,
      };

      const users = await User.paginate({}, options);

      return res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }

  static async findOne(req, res, next) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: 'user not found ' });
      return res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }

  static async edit(req, res) {
    try {
      const userUpdated = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: false,
      });
      if (!userUpdated) return res.status(404).json({ message: 'user not found ' });

      res.json(userUpdated);
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }

  static async destroy(req, res, next) {
    try {
      const userRemoved = await User.findByIdAndDelete(req.params.id);
      if (!userRemoved) return res.status(404).json({ message: 'user not found ' });
      res.json(userRemoved);
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }
}

export default AuthController;
