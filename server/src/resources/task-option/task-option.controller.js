const taskOptionService = require('./task-option.service');
const taskOptionHelper = require('./task-option.helper');
const {getTaskOption} = require('./task-option.acl');
const {getTask} = require('./../task/task.acl');

module.exports.create = async (ctx) => {
  const {taskId, label, isCorrect} = ctx.request.body;

  await getTask(taskId);

  const taskOption = await taskOptionService.create({taskId, label, isCorrect});

  ctx.body = {
    ...taskOptionHelper.format(taskOption),
  };
};

module.exports.get = async (ctx) => {
  const {taskId} = ctx.request.query;

  const taskOptions = await taskOptionService.find({taskId});

  ctx.body = {
    ...taskOptionHelper.formatArray(taskOptions),
  };
};

module.exports.update = async (ctx) => {
  const {taskId, label, isCorrect} = ctx.request.body;

  const taskOption = await getTaskOption(ctx.params.id, ctx.state.user);

  if(typeof taskId !== "undefined") {
    await getTask(subjectId);
  }

  await taskOption.update({taskId, label, isCorrect});

  ctx.body = {
    ...taskOptionHelper.format(taskOption),
  };
};

module.exports.delete = async (ctx) => {
  const taskOption = await getTaskOption(ctx.params.id, ctx.state.user);

  await taskOption.delete();

  ctx.body = {success: true};
};
