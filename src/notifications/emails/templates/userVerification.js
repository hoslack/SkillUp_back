import BaseEmailTemplate from './base';

export default class VerifyUserEmailTemplate extends BaseEmailTemplate {
  constructor({ recipient, verificationCode }) {
    super({ recipient, title: 'Account Verification' });
    this.verificationCode = verificationCode;
  }

  getContent() {
    return `
      <h4>Hello ${this.recipient.fullName}</h4>
      <p>Thank you for registering at SkillUp.
        To verify your account, kindly use the verification code below.
       </p>
       <h1>${this.verificationCode}</h1>
       <p>Thank you.</p>
    `;
  }
}
