const _ = require('lodash');
const taskSetService = require('../../task-set/task-set.service');
const subjectService = require('../../subject/subject.service');
const baseValidator = require('../../base.validator');

const populate = async (ctx, required) => {
  if (ctx.params.id) {
    const taskSet = await taskSetService.findOne({ _id: task.taskSetId });

    if (!taskSet || taskSet.authorId !== ctx.state.user._id) {
      ctx.errors.push({ task: 'Task not found' });
      return false;
    }

    ctx.state.taskSet = taskSet;
    return true;
  } else if(required){
    ctx.errors.push({ task: 'Task Set not found' });
  }
  return false;
}

module.exports.populate = populate;

module.exports.validate = (ctx, isNew) => baseValidator(ctx, async () => {
  let check;

  check = ctx.checkBody('name').trim();
  if (isNew) {
    check.notEmpty();
  } else {
    check.optional();
  }
  check = ctx.checkBody('description').trim();
  if (isNew) {
    check.notEmpty();
  } else {
    check.optional();
  }
  check = ctx.checkBody('subjectId').trim();
  if (isNew) {
    check.notEmpty();
  } else {
    check.optional();
  }

  await populate(ctx, !isNew);

  if (ctx.errors.length > 0) {
    return false;
  }

  const { name, description, subjectId } = ctx.request.body;

  if(subjectId) {
    const subject = await subjectService.findOne({_id: subjectId});

    if (!subject) {
      ctx.errors.push({taskSetId: 'Subject with the following id was not found'});
      return false;
    }
  }

  return { name, description, subjectId };
});
