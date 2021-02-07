const _ = require('lodash');
const taskSetService = require('./task-set.service');
const taskSetHelper = require('./task-set.helper');
const {validate, populate} = require('./validators/task-set.validator');

module.exports.create = async (ctx) => {
  const data = await validate(ctx, true);

  if (!data.isValid) {
    return;
  }

  const {name, description, subjectId} = data;

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
  const data = await validate(ctx, false);

  if (!data.isValid) {
    return;
  }

  const {name, description, subjectId} = data;

  const updatedTaskSet = await taskSetService.updateEntity(ctx.state.taskSet, {name, description, subjectId});

  ctx.body = {
    ...taskSetHelper.format(updatedTaskSet),
  };
};

module.exports.delete = async (ctx) => {
  if(await populate(ctx, true)){
    await taskSetService.remove({ _id: ctx.params.id });
  }
  ctx.body = {success: true};
};
