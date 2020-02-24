import { JWT } from '../utils/auth';
import models from '../database/models';

export default class UserAuth {
  static async authenticate(req) {
    const auth = req.headers.authorization;

    const token = auth ? auth.split(' ') : [];

    if (token.length !== 2 || token[0].toLowerCase() !== 'bearer') {
      return [401, undefined, 'Token not provided'];
    }
    try {
      const decoded = await JWT.verify(token[1]);
      req.userToken = token;
      req.user = decoded;
      const user = await models.User.findOne({
        where: {
          email: decoded.email
        },
        include: [{
          model: models.Role,
          as: 'role'
        }]
      });

      if (!user) {
        return [404, undefined, 'User not found!'];
      }
      req.user.id = user.id;
      req.user.role = user.role.id;
      req.user.verified = user.verified;
    } catch (error) {
      return [401, undefined, 'Invalid token'];
    }
  }

  static checkRole(role, message) {
    return async function checkUserRole(req) {
      const { user: { role: userRole } } = req;
      if (userRole !== role) {
        return [401, undefined, message || 'You are not authorized to perform this action'];
      }
    };
  }

  static checkVerifiedUser(req) {
    const { user: { verified } } = req;
    if (!verified) {
      return [401, undefined, 'Your account needs to be verified first'];
    }
  }
}
