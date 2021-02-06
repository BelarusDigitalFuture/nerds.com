const _ = require('lodash');
const subjectService = require('./subject.service');

module.exports.getCurrent = async (ctx) => {
  const subject = await subjectService.findOne({});

  ctx.body = subject;
};
