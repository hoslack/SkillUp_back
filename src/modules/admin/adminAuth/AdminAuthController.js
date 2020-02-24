import * as bcrypt from 'bcrypt';
import randomstring from 'randomstring';
import models from '../../../database/models';
import { Roles } from '../../../utils/constants';
import EmailSender from '../../../utils/email';
import VerifyUserEmailTemplate from '../../../notifications/emails/templates/userVerification';
import config from '../../../config/environment';

const SALT = 10;

export default class AdminAuthController {
  static async registerUser(req) {
    const { body } = req;
    body.password = await bcrypt.hash(body.password, SALT);
    body.roleId = Roles.SUPER_ADMINISTRATOR;
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

  static async elevateUser(req) {
    const { body: { id } } = req;
    const user = await models.User.findByPk(id, {
      include: [
        {
          model: models.Role,
          as: 'role'
        }
      ]
    });
    const updatedUser = await user.updateAttributes({ roleId: Roles.SUPER_ADMINISTRATOR });
    return [200, { updatedUser }, 'User elevated successfully'];
  }

  static async createFirstAdmin() {
    const req = {};
    req.body = {
      fullName: config.ADMIN_NAME,
      username: config.ADMIN_USERNAME,
      email: config.ADMIN_EMAIL,
      phoneNumber: config.ADMIN_PHONE,
      password: config.ADMIN_PASS,
    };
    const exists = await models.User.findOne({ where: { roleId: Roles.SUPER_ADMINISTRATOR } });
    if (exists) {
      console.log('SuperAdmin user already exists');
      return 'SuperAdmin user already exists';
    }
    AdminAuthController.registerUser(req)
      .then(data => console.log('First admin created', data))
      .catch(error => console.log('There was an error creating the first admin', error));
  }
}
