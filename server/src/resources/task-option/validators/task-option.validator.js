const _ = require('lodash');
const taskOptionService = require('../task-option.service');
const taskSetService = require('../../task-set/task-set.service');
const taskService = require('../../task/task.service');
const baseValidator = require('../../base.validator');

const populate = async (ctx, required) => {
  if (ctx.params.id) {
    const taskOption = await taskOptionService.findOne({ _id: ctx.params.id });
    const task = await taskService.findOne({ _id: taskOption.taskId });
    const taskSet = await taskSetService.findOne({ _id: task.taskSetId });

    if (!taskOption || !task || !taskSet || taskSet.authorId !== ctx.state.user._id) {
      ctx.errors.push({ task: 'Task not found' });
      return false;
    }

    ctx.state.taskOption = taskOption;
    return true;
  } else if(required){
    ctx.errors.push({ task: 'Task Option not found' });
  }
  return false;
}

module.exports.populate = populate;

module.exports.validate = (ctx, isNew) => baseValidator(ctx, async () => {
  let check;

  check = ctx.checkBody('taskId').trim();
  if (isNew) {
    check.notEmpty();
  } else {
    check.optional();
  }
  check = ctx.checkBody('label').trim();
  if (isNew) {
    check.notEmpty();
  } else {
    check.optional();
  }
  check = ctx.checkBody('isCorrect').trim();
  if (isNew) {
    check.notEmpty();
  } else {
    check.optional();
  }

  await populate(ctx, !isNew);

  if (ctx.errors.length > 0) {
    return false;
  }

  const {
    taskId,
    label,
    isCorrect,
  } = ctx.request.body;

  if(taskId) {
    const task = await taskService.findOne({_id: taskId});

    if (!task) {
      ctx.errors.push({taskSetId: 'Task with the following id was not found'});
      return false;
    }
  }

  return {
    taskId,
    label,
    isCorrect,
  };
});
