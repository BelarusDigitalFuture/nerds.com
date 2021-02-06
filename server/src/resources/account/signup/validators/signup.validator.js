const _ = require('lodash');
const userService = require('../../../user/user.service');
const baseValidator = require('../../../base.validator');

module.exports = ctx => baseValidator(ctx, async () => {
  ctx.checkBody('email').isEmail('Please enter a valid email address')
    .trim()
    .toLow();

  ctx.checkBody('password')
    .notEmpty()
    .trim();
  if (ctx.errors.length > 0) {
    return false;
  }

  const { email, password } = ctx.request.body;

  const user = await userService.findOne({ email });
  if (_.get(user, 'deletedAt')) {
    ctx.errors.push({ email: 'You can\'t register with this email at Surveytime', errorKey: 'validatorErrors.deletedUserRegister' });
    return false;
  }

  if (user) {
    ctx.errors.push({ email: 'User already exists, please try to login.', errorKey: 'validatorErrors.userExists' });
    return false;
  }

  const userData = {
    email,
    password,
  };

  return { userData };
});
