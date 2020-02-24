import debug from 'debug';
import dotenv from 'dotenv';
import http from 'http';
import env from './config/environment';
import app from './app';
import AdminAuthController from './modules/admin/adminAuth/AdminAuthController';

dotenv.config();
const logger = debug('log');
const server = http.createServer(app);

server.listen(env.PORT, () => {
  logger(`Find me on http://localhost:${env.PORT}`);
  AdminAuthController.createFirstAdmin().finally(data => console.log(data));
});
