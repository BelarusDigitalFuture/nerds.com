const _ = require('lodash');
const userService = require('../../../user/user.service');
const baseValidator = require('../../../base.validator');

module.exports = ctx => baseValidator(ctx, async () => {
  ctx.checkBody('email').isEmail('Please enter a valid email address')
    .trim()
    .toLow();

  ctx.checkBody('birthDate')
    .isDate('Please, enter actual birth date')
    .trim();

  ctx.checkBody('password')
    .notEmpty()
    .trim();

  ctx.checkBody('name')
    .notEmpty()
    .trim();

  ctx.checkBody('school')
    .notEmpty()
    .trim();

  if (ctx.errors.length > 0) {
    return false;
  }

  const {
    email, password, name,
    school, birthDate,
  } = ctx.request.body;

  const user = await userService.exists({ email });
  if (_.get(user, 'deletedAt')) {
    ctx.errors.push({ email: 'You can\'t register with this email' });
    return false;
  }

  if (user) {
    ctx.errors.push({ email: 'User already exists, please try to login.' });
    return false;
  }

  const userData = {
    email,
    password,
    name,
    school,
    birthDate: new Date(birthDate),
  };

  return { userData };
});
