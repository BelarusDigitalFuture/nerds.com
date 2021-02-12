const _ = require('lodash');
const userService = require('../../../user/user.service');
const baseValidator = require('../../../base.validator');

module.exports = ctx => baseValidator(ctx, async () => {
  ctx.checkBody('email').isEmail('Please enter a valid email address')
    .trim()
    .toLow();

  ctx.checkBody('birthDate')
    .isDate('Please, enter actual birth date')

  ctx.checkBody('password')
    .notEmpty()
    .trim();

  ctx.checkBody('name')
    .notEmpty()
    .trim();

  ctx.checkBody('school')
    .notEmpty()
    .trim();

  ctx.checkBody('form')
    .notEmpty()

  ctx.checkBody('city')
    .notEmpty()
    .trim();


  if (ctx.errors.length > 0) {
    return false;
  }

  const {
    email, password, name,
    school, birthDate, form,
    city,
  } = ctx.request.body;

  const user = await userService.exists({ email });
  if (_.get(user, 'deletedAt')) {
    ctx.errors.push({ email: 'You can\'t register with this email' });
    return false;
  }

  if (user) {
    ctx.errors.push({ email: 'Пользователь с таким имейлом уже существует. Попробуйте авторизоваться.' });
    return false;
  }

  const userData = {
    email,
    password,
    name,
    school,
    form,
    city,
    birthDate: new Date(birthDate),
  };

  return { userData };
});
