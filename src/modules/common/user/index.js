import MRouter from '../../../utils/router';
import UserController from './UserController';
import BaseValidator from '../../../middleware/BaseValidator';
import UserAuth from '../../../middleware/UserAuth';

const Router = new MRouter(UserAuth.authenticate);

Router.get(
  '/user',
  UserController.getCurrentUser
);

Router.post(
  '/user/verifyAccount',
  BaseValidator.requiredFields(['token']),
  UserController.verifyAccount
);
Router.patch('/user',
  BaseValidator.requiredFields([], ['fullName', 'email', 'picture', 'username', 'phoneNumber']),
  UserAuth.checkVerifiedUser,
  UserController.patchCurrentUser);

export default Router.Router;
