const mount = require('koa-mount');

const adminResource = require('../resources/admin');
const userResource = require('../resources/user');
const accountResource = require('../resources/account/public');
const taskResource = require('../resources/task');
const taskSetResource = require('../resources/task-set');
const taskOptionResource = require('../resources/task-option');
const subjectResource = require('../resources/subject');

module.exports = (app) => {
  app.use(mount('/account', accountResource));
  app.use(mount('/admin', adminResource));
  app.use(mount('/user', userResource));
  app.use(mount('/subject', subjectResource));
  app.use(mount('/task', taskResource));
  app.use(mount('/task-set', taskSetResource));
  app.use(mount('/task-option', taskOptionResource));
};
