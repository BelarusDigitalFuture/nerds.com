const _ = require('lodash');

const env = process.env.NODE_ENV || 'development';

let base = {
  env,
  authCookieName: 'access_token',
  defaultTimezone: 'America/Los_Angeles',
  gRecaptchaKey: '6Ld0XFwUAAAAAEpjOXAEB9qWtgwIaekJU6TdMi_w',
};

const envConfig = require(`./${env}.js`); // eslint-disable-line

base = _.merge(base, envConfig || {});

module.exports = base;
