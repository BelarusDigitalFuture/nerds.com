const config = require('../config');
const jwt = require('koa-jwt');

const isAuthenticatedMiddleware = jwt({ secret: config.jwtSecret, cookie: config.authCookieName });

module.exports = isAuthenticatedMiddleware;
