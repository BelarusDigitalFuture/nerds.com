const _ = require('lodash');

const authService = require('../../../services/auth.service');
const loginValidator = require('./validators/login.validator');
const config = require('../../../config');

module.exports.login = async function signin(ctx) {
  const data = await loginValidator(ctx);

  if (!data.isValid) {
    return;
  }

  const { user } = data;
  try {
    const token = await authService.authenticateUser({
      ctx,
      user,
    });
    ctx.body = { token };
  } catch (error) {
    console.log(error);
    ctx.status = 400;
    ctx.body = { error };
  }
};

module.exports.logout = async (ctx) => {
  ctx.cookies.set(config.authCookieName, '', { expires: new Date(1), domain: config.cookieDomain });
  ctx.cookies.set(config.authCookieExistsName, '', { expires: new Date(1), domain: config.cookieDomain });
  ctx.body = {
    success: true,
  };
};
