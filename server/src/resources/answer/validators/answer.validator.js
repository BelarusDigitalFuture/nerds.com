const _ = require('lodash');
const answerService = require('../answer.service');
const taskService = require('../../task/task.service');
const contestService = require('../../contest/contest.service');
const taskOptionService = require('../../task-option/task-option.service');
const baseValidator = require('../../base.validator');
const taskConstants = require("../../task/task.constants");

const populate = async (ctx) => {
  const userId = ctx.state.user._id;
  const {taskId, contestId} = ctx.request.body || ctx.request.query;

  if (!taskId || !contestId || !userId) {
    ctx.errors.push({ answer: 'Answer not found' });
    return false;
  }

  ctx.state.answer = await answerService.findOne({
    taskId,
    contestId,
    userId,
  });

  return false;
}

module.exports.populate = populate;

module.exports.validate = (ctx) => baseValidator(ctx, async () => {
  let check;

  ctx.checkBody('taskId')
    .notEmpty()
    .trim();

  ctx.checkBody('contestId')
    .notEmpty()
    .trim();

  ctx.checkBody('value')
    .notEmpty();

  const { taskId, contestId, value } = ctx.request.body;

  const task = await taskService.findOne({_id: taskId});
  if (!task) {
    ctx.errors.push({taskId: 'Task with the following id was not found'});
  }

  const taskOptions = await taskOptionService.find({taskId: task._id});
  switch(task.type){
    case taskConstants.taskType.oneAnswer:
      if (taskOptions.results.map(x => x._id).indexOf(value) === -1) {
        ctx.errors.push({value: `${value} task option does not exist`});
      }
      break;
    case taskConstants.taskType.multipleAnswers:
      if(Array.isArray(value)) {
        value.forEach(v => {
          if (taskOptions.results.map(x => x._id).indexOf(v) === -1) {
            ctx.errors.push({value: `${v} task option does not exist`});
          }
        });
      } else {
        ctx.errors.push({value: `value should be an array`});
      }
      break;
  }

  const contest = await contestService.findOne({_id: contestId});
  if (!contest) {
    ctx.errors.push({contestId: 'Contest with the following id was not found'});
  }

  if (ctx.errors.length > 0) {
    return false;
  }

  await populate(ctx);

  return { taskId, contestId, value };
});
