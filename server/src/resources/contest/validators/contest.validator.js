const _ = require('lodash');
const contestService = require('../contest.service');
const baseValidator = require('../../base.validator');

module.exports = ctx => baseValidator(ctx, async () => {
  ctx.checkBody('startDate')
    .isDate('Please, enter actual start date')
    .trim();
  ctx.checkBody('endDate')
    .isDate('Please, enter actual end date')
    .trim();
  ctx.checkBody('description')
    .optional()
    .trim();
  ctx.checkBody('ratingEnabled')
    .toBoolean()
    .trim();
  ctx.checkBody('taskSetId')
    .notEmpty()
    .trim();

  if (ctx.errors.length > 0) {
    return false;
  }

  if (ctx.params.id) {
    const contest = await contestService.findOne({ _id: ctx.params.id });

    if (!contest) {
      ctx.errors.push({ contest: 'Contest not found' });
      return false;
    }
  }

  const {
    startDate, endDate, description,
    ratingEnabled, taskSetId,
  } = ctx.request.body;

  return {
    startDate, endDate, description,
    ratingEnabled, taskSetId,
  };
});
