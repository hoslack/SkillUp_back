import mail from '@sendgrid/mail';

export default class EmailSender {
  static sendMail(Template, recipient, subject) {
    mail.setApiKey(process.env.SENGRID_API_KEY);


    Template.getHTML().then((html) => {
      const mailData = {
        from: { email: `${process.env.EMAIL_SENDER}`, name: 'SkillUp' },
        to: recipient,
        subject,
        html
      };

      mail.send(mailData);
    });
  }
}
