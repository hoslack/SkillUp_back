export default class UserValidator {
  static validatePhone(req) {
    const { body: { phoneNumber } } = req;
    if (phoneNumber) {
      req.checkBody('phoneNumber')
        .matches(/^(0|\+254|254)7\d{8}$/)
        .withMessage('Invalid phone number');
    }
  }

  static validateEmail(req) {
    const { body: { email } } = req;
    if (email) {
      req.checkBody('email', 'Please enter a valid email')
        .isEmail();
    }
  }
}
