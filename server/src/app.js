require('app-module-path').addPath(__dirname);

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const logger = require('./services/logger.service');

const config = require('config');
const Koa = require('koa');

const app = new Koa();
require('./config/koa')(app);
require('./config/routes')(app);

app.listen(config.port, () => {
  logger.warn(`Web application server listening on ${config.port}, in ${process.env.NODE_ENV} mode`);
});

process.on('unhandledRejection', error => logger.error(error));

module.exports = app;
