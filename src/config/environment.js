const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_DIALECT: 'postgres',
  ADMIN_NAME: process.env.ADMIN_NAME,
  ADMIN_USERNAME: process.env.ADMIN_USERNAME,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PHONE: process.env.ADMIN_PHONE,
  ADMIN_PASS: process.env.ADMIN_PASS
};
