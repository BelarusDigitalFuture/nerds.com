const _ = require('lodash');
const hasher = require('wordpress-hash-node');
const userService = require('./user.service');
const userValidator = require('./validators/user.validator');
const userHelper = require('./user.helper');

module.exports.getCurrent = async (ctx) => {
  const user = await userService.findOne({
    _id: ctx.state.user._id,
  });

  ctx.body = {
    ...userHelper.formatUser(user),
  };
};

module.exports.update = async (ctx) => {
  const data = await userValidator(ctx);

  if (!data.isValid) {
    return;
  }

  delete data.isValid;

  if (data.password) {
    const hash = hasher.HashPassword(data.password);
    data.passwordHash = hash.toString();
    delete data.password;
  }

  const updatedUser = await userService.findOneAndUpdate({ _id: ctx.state.user._id }, {
    $set: {
      ...data,
    },
  });

  ctx.body = {
    ...userHelper.formatUser(updatedUser),
  };
};
