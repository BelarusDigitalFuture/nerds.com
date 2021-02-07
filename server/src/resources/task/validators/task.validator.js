const _ = require('lodash');
const {taskType} = require('../task.constants');
const taskService = require('../task.service');
const taskSetService = require('../../task-set/task-set.service');
const baseValidator = require('../../base.validator');

const populate = async (ctx, required) => {
  if (ctx.params.id) {
    const task = await taskService.findOne({_id: ctx.params.id});
    const taskSet = await taskSetService.findOne({_id: task.taskSetId});

    if (!task || taskSet.authorId !== ctx.state.user._id) {
      ctx.errors.push({task: 'Task not found'});
      return false;
    }

    ctx.state.task = task;
    return true;
  } else if (required) {
    ctx.errors.push({task: 'Task not found'});
  }
  return false;
}

module.exports.populate = populate;

module.exports.validate = (ctx, isNew) => baseValidator(ctx, async () => {
  let check;

  check = ctx.checkBody('taskSetId');
  if (isNew) {
    check.notEmpty();
  } else {
    check.optional();
  }
  check.trim();

  check = ctx.checkBody('type');
  if (isNew) {
    check.notEmpty();
  } else {
    check.optional();
  }
  check.trim();

  check = ctx.checkBody('text');
  if (isNew) {
    check.notEmpty();
  } else {
    check.optional();
  }
  check
    .isLength(2, null, 'Text must be at least 2 characters')
    .trim();

  check = ctx.checkBody('correctAnswerPoints');
  if (isNew) {
    check.notEmpty();
  } else {
    check.optional();
  }

  ctx.checkBody('evaluationInformation')
    .optional()
    .isLength(2, null, 'Evaluation information must be at least 2 characters')
    .trim();
  ctx.checkBody('maxLength')
    .optional();
  ctx.checkBody('maxWords')
    .optional();

  await populate(ctx, !isNew);

  if (ctx.errors.length > 0) {
    return false;
  }

  const {
    taskSetId, type, maxLength,
    maxWords, text, evaluationInformation,
    correctAnswerPoints,
  } = ctx.request.body;

  if (typeof type !== 'undefined' && !Object.values(taskType).includes(type)) {
    ctx.errors.push({type: 'Incorrect type of task'});
    return false;
  }

  if (taskSetId) {
    const taskSet = await taskSetService.findOne({_id: taskSetId});

    if (!taskSet || taskSet.authorId !== ctx.state.user._id) {
      ctx.errors.push({taskSetId: 'Task set with the following id was not found'});
      return false;
    }
  }

  return {
    taskSetId, type, maxLength,
    maxWords, text, evaluationInformation,
    correctAnswerPoints,
  };
});
