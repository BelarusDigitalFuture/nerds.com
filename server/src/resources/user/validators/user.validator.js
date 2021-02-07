const _ = require('lodash');
const userService = require('../user.service');
const baseValidator = require('../../base.validator');

module.exports = ctx => baseValidator(ctx, async () => {
  ctx.checkBody('email')
    .optional()
    .isEmail('Please enter a valid email address')
    .trim()
    .toLow();

  ctx.checkBody('birthDate')
    .optional()
    .isDate('Please, enter actual birth date')
    .trim();

  ctx.checkBody('password')
    .optional()
    .trim();

  ctx.checkBody('name')
    .optional()
    .trim();

  ctx.checkBody('school')
    .optional()
    .trim();

  if (ctx.errors.length > 0) {
    return false;
  }

  if (!Object.keys(ctx.request.body).length) {
    ctx.errors.push({ user: 'Please, provide some data for update' });
    return false;
  }

  const {
    email, password, name,
    school, birthDate,
  } = ctx.request.body;

  if (email) {
    const sameEmailUser = await userService.exists({
      _id: { $ne: ctx.state.user._id },
      email,
    });

    if (sameEmailUser) {
      ctx.errors.push({ email: 'User with the same email already exists' });
      return false;
    }
  }

  return {
    ...(email && { email }),
    ...(password && { password }),
    ...(name && { name }),
    ...(school && { school }),
    ...birthDate && { birthDate: new Date(birthDate) },
  };
});
