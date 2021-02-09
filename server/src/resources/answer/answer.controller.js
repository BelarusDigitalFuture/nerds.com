const _ = require('lodash');
const answerHelper = require('./answer.helper');
const answerService = require('./answer.service');
const taskService = require('./../task/task.service');
const taskConstants = require('./../task/task.constants');
const {validate, populate} = require('./validators/answer.validator');

// Answer
// - POST /api/answer?contest&task - create answer for the task and contest. Answers are immutable (creating one should remove previous)
// - GET /api/answer?contest&task - get answers for the specified contest and task
// - DELETE /api/answer?contest&task - delete answer

module.exports.createOrUpdate = async (ctx) => {
  const data = await validate(ctx);

  if (!data.isValid) {
    return;
  }
  const { taskId, contestId, value, points } = data;

  let answer = await answerService.findOne({
    taskId,
    contestId,
    userId: ctx.state.user._id,
  });

  if(answer){
    await answerService.updateEntity(answer._id, { value, points });
  } else {
    answer = await answerService.create({ taskId, contestId, userId: ctx.state.user._id, value, points });
  }

  ctx.body = {
    ...answerHelper.format(answer),
  };
};

module.exports.get = async (ctx) => {
  const { taskId, contestId } = ctx.request.query;

  const answer = await answerService.findOne({
    taskId,
    contestId,
    userId: ctx.state.user._id,
  });

  ctx.body = {
    ...answerHelper.format(answer),
  };
};

module.exports.delete = async (ctx) => {
  const { taskId, contestId } = ctx.request.query;
  await answerService.remove({ taskId, contestId, userId: ctx.state.user._id });
  ctx.body = {success: true};
};
