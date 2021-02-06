const _ = require('lodash');

const verifyRoles = (requiredRoles = []) => {
  return async function verify(ctx, next) {
    const userRoles = ctx.state.user.roles || [];
    const hasAllRoles = _.difference(requiredRoles, userRoles).length === 0;
    if (!hasAllRoles) {
      ctx.status = 403;
      ctx.body = '';
      return;
    }
    await next();
  };
};

module.exports.isAdmin = verifyRoles(['admin']);
