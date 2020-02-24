import AuthController from './AdminAuthController';
import MRouter from '../../../utils/router';
import UserAuth from '../../../middleware/UserAuth';
import { Roles } from '../../../utils/constants';

const Router = new MRouter(
  UserAuth.authenticate,
  UserAuth.checkRole(Roles.SUPER_ADMINISTRATOR),
  UserAuth.checkVerifiedUser
);

Router.patch('/elevate', AuthController.elevateUser);

export default Router.Router;
