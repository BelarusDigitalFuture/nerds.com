const _ = require('lodash');
const contestService = require('../contest.service');
const taskSetService = require('../../task-set/task-set.service');
const baseValidator = require('../../base.validator');

module.exports = (ctx, isNew) => baseValidator(ctx, async () => {
  let check;
  check = ctx.checkBody('startDate');
  if (isNew) {
    check.isDate('Please, enter actual start date')
  } else {
    check.optional();
  }

  check = ctx.checkBody('endDate');
  if (isNew) {
    check.isDate('Please, enter actual end date')
  } else {
    check.optional();
  }

  check = ctx.checkBody('ratingEnabled');
  if (isNew) {
    check.toBoolean();
  } else {
    check.optional();
  }

  check = ctx.checkBody('taskSetId');
  if (isNew) {
    check.notEmpty();
  } else {
    check.optional();
  }
  check.trim();

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

  let subjectId;
  if (taskSetId) {
    const taskSet = await taskSetService.findOne({ _id: taskSetId });
    subjectId = _.get(taskSet, 'subjectId', '');
    if (!taskSet || !subjectId) {
      ctx.errors.push({ taskSetId: 'Task set with the following Id was not found' });
      return false;
    }
  }

  return {
    startDate, endDate, description,
    ratingEnabled, taskSetId, subjectId,
  };
});
