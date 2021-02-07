const taskOptionService = require('./task-option.service');
const taskOptionHelper = require('./task-option.helper');
const {validate, populate} = require('./validators/task-option.validator');

module.exports.create = async (ctx) => {
  const data = await validate(ctx, true);

  if (!data.isValid) {
    return;
  }
  const {taskId, label, isCorrect} = data;

  const taskOption = await taskOptionService.create({taskId, label, isCorrect});

  ctx.body = {
    ...taskOptionHelper.format(taskOption),
  };
};

module.exports.get = async (ctx) => {
  const {taskId} = ctx.request.query;

  if(!taskId){
    ctx.errors.push({taskId: 'TaskId is not set'});
    return false;
  }

  const taskOptions = await taskOptionService.find({taskId});

  ctx.body = {
    ...taskOptionHelper.formatArray(taskOptions),
  };
};

module.exports.update = async (ctx) => {
  const data = await validate(ctx, false);

  if (!data.isValid) {
    return;
  }

  const {
    taskId, label, isCorrect,
  } = data;

  const updatedTaskOption = await taskService.findOneAndUpdate({
    _id: ctx.params.id,
  }, {
    $set: {
      taskId, label, isCorrect,
    },
  }, { returnOriginal: false });

  ctx.body = {
    ...taskOptionHelper.format(updatedTaskOption),
  };
};

module.exports.delete = async (ctx) => {
  if(await populate(ctx, true)){
    await taskOptionService.remove({ _id: ctx.params.id });
  }
  ctx.body = {success: true};
};
