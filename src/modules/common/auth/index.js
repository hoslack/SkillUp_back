import models from '../../../database/models';
import BaseValidator from '../../../middleware/BaseValidator';
import UserValidator from '../../../middleware/UserValidator';
import AuthController from './AuthController';
import MRouter from '../../../utils/router';

const Router = new MRouter(
  BaseValidator.requiredFields(['fullName', 'username', 'email', 'phoneNumber', 'password']),
  UserValidator.validatePhone,
  UserValidator.validateEmail,
);

Router.post(
  '/register',
  BaseValidator.uniqueFields(
    {
      email: 'The email provided is already in use',
      username: 'The username provided is already in use'
    },
    models.User
  ),
  AuthController.registerUser
);

Router.post(
  '/login',
  BaseValidator.requiredFields(['password'], ['username', 'email', 'phoneNumber']),
  AuthController.loginUser
);

export default Router.Router;
