const _ = require('lodash');
const { taskType } = require('../task.constants');
const taskService = require('../task.service');
const taskSetService = require('../../task-set/task-set.service');
const baseValidator = require('../../base.validator');

module.exports = ctx => baseValidator(ctx, async () => {
  ctx.checkBody('taskSetId')
    .notEmpty()
    .trim();
  ctx.checkBody('type')
    .notEmpty()
    .trim();
  ctx.checkBody('evaluationInformation')
    .optional()
    .isLength(2, null, 'Evaluation information must be at least 2 characters')
    .trim();
  ctx.checkBody('text')
    .optional()
    .isLength(2, null, 'Text must be at least 2 characters')
    .trim();
  ctx.checkBody('maxLength')
    .optional();
  ctx.checkBody('maxWords')
    .optional();
  ctx.checkBody('correctAnswerPoints')
    .notEmpty();

  if (ctx.errors.length > 0) {
    return false;
  }

  if (ctx.params.id) {
    const task = await taskService.findOne({ _id: ctx.params.id });

    if (!task) {
      ctx.errors.push({ task: 'Task not found' });
      return false;
    }
  }

  const {
    taskSetId, type, maxLength,
    maxWords, text, evaluationInformation,
    correctAnswerPoints,
  } = ctx.request.body;

  if(!Object.values(taskType).includes(type)){
    ctx.errors.push({ type: 'Incorrect type of task' });
    return false;
  }

  const taskSet = await taskSetService.findOne({ _id: taskSetId });

  if (!taskSet) {
    ctx.errors.push({ taskSetId: 'Task set with the following id was not found' });
    return false;
  }

  return {
    taskSetId, type, maxLength,
    maxWords, text, evaluationInformation,
    correctAnswerPoints,
  };
});
