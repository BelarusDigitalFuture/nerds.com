const _ = require('lodash');
const subjectService = require('../subject.service');
const baseValidator = require('../../base.validator');

module.exports = ctx => baseValidator(ctx, async () => {
  ctx.checkBody('name')
    .notEmpty()
    .trim();

  if (ctx.errors.length > 0) {
    return false;
  }

  if (ctx.params.id) {
    const subject = await subjectService.findOne({ _id: ctx.params.id });

    if (!subject) {
      ctx.errors.push({ subject: 'Subject not found' });
      return false;
    }
  }

  const { name } = ctx.request.body;

  return {
    name,
  };
});
