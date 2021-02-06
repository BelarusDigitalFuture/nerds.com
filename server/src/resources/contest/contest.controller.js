const _ = require('lodash');
const contestService = require('./contest.service');

module.exports.getCurrent = async (ctx) => {
  const subject = await contestService.findOne({});

  ctx.body = subject;
};
