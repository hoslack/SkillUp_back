import models from '../../../database/models';

export default class UserController {
  static async getCurrentUser(req) {
    const { user: { id } } = req;

    const user = await UserController.getUserById(id);

    return [200, { user }, 'User retrieved successfully'];
  }

  static async getUserById(id) {
    return models.User.findByPk(id, {
      include: [
        {
          model: models.Role,
          as: 'role'
        }
      ]
    });
  }

  static async verifyAccount(req) {
    const { user: { id } } = req;
    const user = await models.User.unscoped().findByPk(id);

    if (user.verified) {
      return [
        200, undefined, 'Account already verified'
      ];
    }

    req.checkBody('token', 'Invalid verification code. Please request another one.')
      .equals(user.verificationCode);

    if (!req.validationErrors()) {
      await user.update({
        verified: true
      });

      return [
        200,
        { user: await UserController.getUserById(id) },
        'Your account has been verified'
      ];
    }
  }

  static async patchCurrentUser(req) {
    const { user: { id } } = req;
    const user = await models.User.findByPk(id);
    const updatedUser = await user.update(req.body);
    return [200, { updatedUser }, 'User updated successfully'];
  }
}
