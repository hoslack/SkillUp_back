import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;
const EXPIRY = process.env.TOKEN_EXPIRY || '12h';

export class JWT {
  static generate({
    fullName, username, email, phoneNumber, picture, location
  }) {
    const payload = {
      fullName,
      username,
      email,
      phoneNumber,
      picture,
      location
    };
    return jwt.sign(payload, JWT_SECRET,
      {
        expiresIn: EXPIRY,
        algorithm: 'HS256'
      });
  }

  static verify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if (err || !decodedToken) {
          return reject(err);
        }
        resolve(decodedToken);
      });
    });
  }
}
