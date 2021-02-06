const _ = require('lodash');
const { generatePlainPassword } = require('../../../helpers/security.utils');
const signupValidator = require('./validators/signup.validator');
const { createUserAccount } = require('../../user/user.service');
const authService = require('../../../services/auth.service');

module.exports.signup = async function signup(ctx) {
  const data = await signupValidator(ctx);

  if (!data.isValid) {
    return;
  }

  const { userData } = data;

  const password = generatePlainPassword();
  userData.password = password;
  const user = await createUserAccount({ userData, ctx });

  try {
    const token = await authService.authenticateUser({
      ctx,
      user,
    });
    ctx.body = { token, password };
  } catch (error) {
    console.error(error);
    ctx.status = 400;
    ctx.body = { error };
  }
};
