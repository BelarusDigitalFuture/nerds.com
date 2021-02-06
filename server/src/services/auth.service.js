const jwt = require('jsonwebtoken');
const qs = require('querystring');

const config = require('../config/index');
const userService = require('../resources/user/user.service');
const { encrypt, decrypt } = require('./crypto.service');

const logger = require('./logger.service');

const service = {};

service.createAuthToken = ({ userId, roles, isDeleted = false }) => {
  const payload = {
    _id: userId,
    roles,
    isDeleted,
  };

  return jwt.sign(payload, config.jwtSecret, {});
};

service.decodeToken = (token) => {
  let res;

  try {
    res = jwt.verify(token, config.jwtSecret);
  } catch (err) {
    logger.warn('Invalid json web token', err);
  }

  return res;
};

service.encryptSignupData = (user) => {
  return encrypt(JSON.stringify({ _id: user._id }));
};

service.decryptSignupData = (hash) => {
  return decrypt(hash)
    .then(result => JSON.parse(result));
};

service.getCookieExpireDate = () => {
  const expires = new Date();
  expires.setDate(expires.getDate() + config.cookieDays);
  return expires;
};

service.setAuthCookie = (ctx, token) => {
  ctx.cookies.set(
    config.authCookieName,
    token,
    { expires: service.getCookieExpireDate(), domain: config.cookieDomain },
  );

  ctx.cookies.set(
    config.authCookieExistsName,
    true,
    {
      expires: service.getCookieExpireDate(),
      domain: config.cookieDomain,
      httpOnly: false,
    },
  );
};

service.authenticateUser = async ({
  ctx, user,
}) => {
  const token = service.createAuthToken({
    userId: user._id,
    roles: user.roles,
  });

  await userService.update({ _id: user._id }, (doc) => {
    doc.lastLoginAt = new Date();
  });

  service.setAuthCookie(ctx, token);

  return token;
};

service.getAuthenticatedUserOrNull = ({ ctx }) => {
  try {
    const user = jwt.verify(ctx.cookies.get(config.authCookieName), config.jwtSecret);
    return userService.findOne({ _id: user._id });
  } catch (e) {
    return null;
  }
};

service.removeAuthCookie = (ctx) => {
  ctx.cookies.set(config.authCookieName, '', { expires: new Date(1), domain: config.cookieDomain });
  ctx.cookies.set(config.authCookieExistsName, '', { expires: new Date(1), domain: config.cookieDomain });
};

module.exports = service;
