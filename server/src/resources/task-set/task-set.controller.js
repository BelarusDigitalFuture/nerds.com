const _ = require('lodash');
const taskSetService = require('./task-set.service');
const taskSetHelper = require('./task-set.helper');
const {getTaskSet} = require('./task-set.acl');
const {getSubject} = require('./../subject/subject.acl');

module.exports.create = async (ctx) => {
  const {name, description, subjectId} = ctx.request.body;

  await getSubject(subjectId);

  const taskSet = await taskSetService.create({
    name,
    description,
    subjectId,
    authorId: ctx.state.user._id,
  });

  ctx.body = {
    ...taskSetHelper.format(taskSet),
  };
};

module.exports.get = async (ctx) => {
  const taskSets = await taskSetService.find({
    authorId: ctx.state.user._id,
  });

  ctx.body = {
    ...taskSetHelper.formatArray(taskSets),
  };
};

module.exports.update = async (ctx) => {
  const {name, description, subjectId} = ctx.request.body;

  const taskSet = await getTaskSet(ctx.params.id, ctx.state.user);

  if(typeof subjectId !== "undefined") {
    await getSubject(subjectId);
  }

  await taskSet.update({name, description, subjectId});

  ctx.body = {
    ...taskSetHelper.format(taskSet),
  };
};

module.exports.delete = async (ctx) => {
  const taskSet = await getTaskSet(ctx.params.id, ctx.state.user);

  await taskSet.delete();

  ctx.body = {success: true};
};
