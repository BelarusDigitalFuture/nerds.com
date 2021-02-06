const _ = require('lodash');
const signupValidator = require('./validators/signup.validator');
const { createUserAccount } = require('../../user/user.service');
const authService = require('../../../services/auth.service');

module.exports.signup = async function signup(ctx) {
  const data = await signupValidator(ctx);

  if (!data.isValid) {
    return;
  }

  const { userData } = data;
  const user = await createUserAccount({ userData, ctx });

  try {
    const token = await authService.authenticateUser({
      ctx,
      user,
    });
    ctx.body = { token };
  } catch (error) {
    console.error(error);
    ctx.status = 400;
    ctx.body = { error };
  }
};
