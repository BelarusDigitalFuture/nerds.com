const _merge = require('lodash/merge');
const env = process.env.NODE_ENV || 'development';

let base = {
  env,
  authCookieName: 'access_token',
};

const envConfig = require(`./${env}.js`);

base = _merge(base, envConfig || {});

module.exports = base;
