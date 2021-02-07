const _ = require('lodash');
const subjectService = require('./subject.service');

module.exports.getAll = async (ctx) => {
  const subjects = await subjectService.find({});

  ctx.body = subjects;
};
