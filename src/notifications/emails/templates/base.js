import inlineCss from 'inline-css';

class BaseEmailTemplate {
  constructor({
    title,
    text,
    buttonLink,
    buttonText,
    redirectURL,
    recipient = {}
  }) {
    this.title = title;
    this.text = text;
    this.buttonLink = buttonLink;
    this.buttonText = buttonText;
    this.redirectURL = redirectURL || '/';
    this.recipient = recipient;
  }

  getStyle() {
    return '';
  }

  getHTML() {
    return inlineCss(`
      <!DOCTYPE html>
      <html lang="en" dir="ltr">
      <head>
          <meta charset="utf-8">
          <link href="https://fonts.googleapis.com/css?family=Work+Sans" rel="stylesheet">
          <style media="screen">
            * {
              font-family: 'Work Sans', sans-serif;
              color: #333;
            }

            h1, h2, h3, h4, h5 {
              font-weight: 300;
            }

            body {
              background: #eee;
              text-align: center;
              padding: 20px;
            }

            .content {
              width: 500px;
              background: white;
              padding: 0;
              margin: auto;
            }

            .title {
              padding: 20px;
              margin: 0;
            }

            .banner {
              width: 90%;
              height: 350px;
              object-position: center;
              object-fit: cover;
              margin: 1em;
            }

            .info {
              padding: 1em;
            }

            .button {
              background: #3F51B5;
              border: none;
              color: white;
              outline: none;
              padding: 1em 2em;
              border-radius: 5px;
              cursor: pointer;
              text-decoration: none;
            }

            .background {
              height: 350px;
              width: 100%;
              background: #FF5252;
              background-size: 100% 20px;
            }

            .footer {
              padding: 3em 1em;
              border-top: 1px solid #ddd;
              font-size: 0.8em;
              color: #666;
            }

            a {
              color: #555;
            }
            ${this.getStyle()}
          </style>
      </head>
      <body>
      <div class="content">
          <h1 class="title">SkillUp</h1>
          <div class="info">
            <h2 class="email-title">${this.title}</h2>
            ${this.getContent()}
          </div>
          <div class="footer">
          ${this.getFooter()}
          </div>
      </div>
      </body>
      </html>
      `, { url: this.redirectURL });
  }

  getContent() {
    return `
      ${this.recipient.fullName ? `<h4>Hello ${this.recipient.fullName}</h4><br>` : ''}
      <p>${this.text}</p>
      <br>
      <br>
      ${this.getButton()}
      <br>
      <br>
   `;
  }

  getButton() {
    return `
    <a href="${this.buttonLink}" class="button">${this.buttonText}</a>
     <br>
     <br>
     <br>
    `;
  }

  getFooter() {
    return `
        @SkillUp | Nairobi Kenya
        <a href="#">Privacy Policy</a> | <a href="#">Terms and Conditions</a>
        <br>
        <br>
        <a href="#">Unsubscribe</a> from our mailing list
    `;
  }
}

export default BaseEmailTemplate;
