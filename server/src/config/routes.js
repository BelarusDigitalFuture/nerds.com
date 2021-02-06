const mount = require('koa-mount');

const adminResource = require('../resources/admin');
const userResource = require('../resources/user');
const accountResource = require('../resources/account/public');

module.exports = (app) => {
  app.use(mount('/account', accountResource));
  app.use(mount('/admin', adminResource));
  app.use(mount('/users', userResource));
};
