import * as bcrypt from 'bcrypt';
import randomstring from 'randomstring';
import models from '../../../database/models';
import { Roles } from '../../../utils/constants';
import { JWT } from '../../../utils/auth';
import EmailSender from '../../../utils/email';
import VerifyUserEmailTemplate from '../../../notifications/emails/templates/userVerification';

const { Op } = models.Sequelize;

const SALT = 10;

export default class AuthController {
  static async registerUser(req) {
    const { body } = req;
    body.password = await bcrypt.hash(body.password, SALT);
    body.roleId = Roles.REVIEWER;
    body.verificationCode = randomstring.generate({
      charset: 'alphanumeric',
      length: 6
    }).toUpperCase();

    body.verified = false;

    const user = await models.User.create(body, {
      include: [{
        model: models.Role,
        as: 'role'
      }],
    });

    await user.reload();

    const template = new VerifyUserEmailTemplate({
      recipient: user,
      verificationCode: body.verificationCode
    });

    EmailSender.sendMail(template, user.email, 'Registration');

    return [201, { user }, 'User created Successfully'];
  }

  static async loginUser(req) {
    const {
      body: {
        password, username, email, phoneNumber
      }
    } = req;
    const authUser = await models.User.unscoped().findOne({
      where: {
        [Op.or]: {
          username,
          email,
          phoneNumber
        }
      }
    });
    if (authUser) {
      const { password: userPassword, id } = authUser;
      if (authUser && (await bcrypt.compare(password, userPassword))) {
        const user = await models.User.findByPk(id, {
          include: [
            {
              model: models.Role,
              as: 'role'
            }
          ]
        });

        return [200, { token: JWT.generate(user), user }, 'Login successful'];
      }
    }
    return [403, undefined, 'Invalid credentials'];
  }
}
