const _ = require('lodash');
const userService = require('../../../../resources/user/user.service');
const baseValidator = require('../../../../resources/base.validator');
const { CheckPassword } = require('wordpress-hash-node');

module.exports = ctx => baseValidator(ctx, async () => {
  ctx.checkBody('email')
    .notEmpty()
    .trim()
    .toLow();
  ctx.checkBody('password')
    .notEmpty()
    .trim();

  if (ctx.errors.length > 0) {
    return false;
  }

  const { email } = ctx.request.body;
  const user = await userService.findOne({ email });

  if (!user || !user.passwordHash || !CheckPassword(ctx.request.body.password, user.passwordHash)) {
    ctx.errors.push({ user: 'Wrong credentials', errorKey: 'validatorErrors.credentials' });
    return false;
  }

  return { user };
});
