const _ = require('lodash');
const moment = require('moment');

const env = process.env.NODE_ENV || 'development';

let base = {
  env,
  port: process.env.BASE_PORT || 8081,
  appName: 'Nerds',
  defaultTimezone: 'America/Los_Angeles',
  authCookieName: 'access_token',
  preferredLanguageCodeCookieName: 'preferred_language_code',
  authCookieExistsName: 'is_authenticated',
  cookieDays: 7,
  cryptoSecret: 'AeShee4aaiYah4ooJa4xeTheahy7aX2o',
  jwtSecret: 'WGokY11H4qmeqTnuFYKw0vdnaYlpyc40',
};

const envConfig = require(`./${env}.js`); // eslint-disable-line

base = _.merge(base, envConfig || {});

module.exports = base;
