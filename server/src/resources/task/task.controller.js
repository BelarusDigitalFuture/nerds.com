const _ = require('lodash');
const taskHelper = require('./task.helper');
const taskService = require('./task.service');
const taskConstants = require('./task.constants');
const {getTask} = require('./task.acl');
const {getTaskSet} = require('./../task-set/task-set.acl');

module.exports.create = async (ctx) => {
  const {taskSetId, type, maxLength, maxWords, text, evaluationInformation, correctAnswerPoints} = ctx.request.body;

  await getTaskSet(taskSetId, ctx.state.user);

  if(Object.values(taskConstants.taskType).indexOf(type) === -1){
    throw new Error('bad type');
  }

  const task = await taskService.create({taskSetId, type, maxLength, maxWords, text, evaluationInformation, correctAnswerPoints});

  ctx.body = {
    ...taskHelper.format(task),
  };
};

module.exports.get = async (ctx) => {
  const {taskSetId} = ctx.request.query;

  await getTaskSet(taskSetId, ctx.state.user);

  const tasks = await taskService.find({taskSetId});

  ctx.body = {
    ...taskHelper.formatArray(tasks),
  };
};

module.exports.update = async (ctx) => {
  const {taskSetId, type, maxLength, maxWords, text, evaluationInformation, correctAnswerPoints} = ctx.request.body;
  const {id} = ctx.params;
  
  const task = await getTask(id, ctx.state.user);

  if(typeof taskSetId !== 'undefined') {
    await getTaskSet(taskSetId);
  }

  if(Object.values(taskConstants.taskType).indexOf(type) === -1){
    throw new Error('bad type');
  }

  await task.update({taskSetId, type, maxLength, maxWords, text, evaluationInformation, correctAnswerPoints});

  ctx.body = {
    ...taskHelper.format(task),
  };
};

module.exports.delete = async (ctx) => {
  const task = await getTask(ctx.params.id, ctx.state.user);

  await task.delete();

  ctx.body = {success: true};
};
