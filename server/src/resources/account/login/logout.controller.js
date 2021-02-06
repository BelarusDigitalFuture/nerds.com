const config = require('../../../config');

module.exports.logout = async (ctx) => {
  ctx.cookies.set(config.authCookieName, '', { expires: new Date(1), domain: config.cookieDomain });
  ctx.cookies.set(config.authCookieExistsName, '', { expires: new Date(1), domain: config.cookieDomain });
  ctx.body = {};
};
