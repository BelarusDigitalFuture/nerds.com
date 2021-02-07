const _ = require('lodash');
const taskHelper = require('./task.helper');
const taskService = require('./task.service');
const {validate, populate} = require('./validators/task.validator');

module.exports.create = async (ctx) => {
  const data = await validate(ctx, true);

  if (!data.isValid) {
    return;
  }
  const {
    taskSetId, type, maxLength,
    maxWords, text, evaluationInformation,
    correctAnswerPoints,
  } = data;

  const task = await taskService.create({
    taskSetId,
    type,
    maxLength,
    maxWords,
    text,
    evaluationInformation,
    correctAnswerPoints,
  });

  ctx.body = {
    ...taskHelper.format(task),
  };
};

module.exports.get = async (ctx) => {
  const { taskSetId } = ctx.request.query;

  const task = await taskService.findOne({ taskSetId });

  ctx.body = {
    ...taskHelper.format(task),
  };
};

module.exports.update = async (ctx) => {
  const data = await validate(ctx, false);

  if (!data.isValid) {
    return;
  }
  const {
    taskSetId, type, maxLength,
    maxWords, text, evaluationInformation,
    correctAnswerPoints,
  } = data;

  const updatedTask = await taskService.findOneAndUpdate({
    _id: ctx.params.id,
  }, {
    $set: {
      taskSetId,
      type,
      maxLength,
      maxWords,
      text,
      evaluationInformation,
      correctAnswerPoints,
    },
  });

  ctx.body = {
    ...taskHelper.format(updatedTask),
  };
};

module.exports.delete = async (ctx) => {
  if(await populate(ctx, true)){
    await taskService.remove({ _id: ctx.params.id });
  }
  ctx.body = {success: true};
};
