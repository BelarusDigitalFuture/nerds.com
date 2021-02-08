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

  let answer = ctx.state.answer;
  if(answer){
    await answerService.updateEntity(answer, { value, points });
  } else {
    answer = await answerService.create({ taskId, contestId, userId: ctx.state.user._id, value, points });
  }

  ctx.body = {
    ...answerHelper.format(answer),
  };
};

module.exports.get = async (ctx) => {
  const { taskId, contestId } = ctx.request.query;

  if(!taskId){
    ctx.errors.push({taskId: 'taskId is not set'});
    return false;
  }

  if(!contestId){
    ctx.errors.push({contestId: 'contestId is not set'});
    return false;
  }

  await populate(ctx);

  if(!ctx.state.answer){
    ctx.errors.push({answer: 'answer not found'});
  }

  ctx.body = {
    ...answerHelper.array(answer),
  };
};

module.exports.delete = async (ctx) => {
  if(await populate(ctx)){
    await answerService.remove({ _id: ctx.params.answer._id });
  }
  ctx.body = {success: true};
};
