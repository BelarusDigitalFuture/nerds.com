const baseValidator = require('../../../base.validator');
const authService = require('../../../../services/auth.service');

module.exports = ctx => baseValidator(ctx, async () => {
  ctx.checkParams('token').notEmpty()
    .trim();

  if (ctx.errors.length > 0) {
    return false;
  }

  const { token } = ctx.params;
  if (!token || !authService.decodeToken(token)) {
    return false;
  }

  return {
    token,
  };
});
