const cors = require('kcors');
const helmet = require('koa-helmet');
const validate = require('koa-validate');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const logger = require('../services/logger.service');
const config = require('./index');

module.exports = (app) => {
  app.keys = [config.cryptoSecret];
  app.proxy = true;
  app.use(cors({ credentials: true }));
  app.use(helmet());
  app.use(bodyParser({
    enableTypes: ['json', 'form', 'text'],
    formLimit: '5mb',
  }));
  app.use(session(app));
  validate(app);

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      logger.error(err);
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = {
        errors: [{ _global: 'An error has occurred' }],
      };
    }
  });
};
