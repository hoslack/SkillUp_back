import common from './common';
import admin from './admin';

const modules = {
  admin,
  common
};

const apiVersion = '/api/v1';

export default (app) => {
  Object.keys(modules).forEach((module) => {
    modules[module].forEach((route) => {
      app.use(`${apiVersion}/${module === 'common' ? '' : module}`, route);
    });
  });
  return app;
};
