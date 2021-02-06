const _ = require('lodash');
const moment = require('moment');
const userService = require('./user.service');
const userHelper = require('./user.helper');

module.exports.getCurrent = async (ctx) => {
  const user = await userService.findOne({
    _id: ctx.state.user._id,
  });

  ctx.body = {
    ...userHelper.formatUser(user),
  };
};
