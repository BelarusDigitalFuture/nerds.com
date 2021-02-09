const _ = require('lodash');
const taskSetService = require('../../task-set/task-set.service');
const subjectService = require('../../subject/subject.service');
const baseValidator = require('../../base.validator');

const populate = async (ctx, required) => {
  if (ctx.params.id) {
    const taskSet = await taskSetService.findOne({ _id: ctx.params.id });

    if (!taskSet || taskSet.authorId !== ctx.state.user._id) {
      ctx.errors.push({ task: 'Task Set not found' });
      return false;
    }

    return true;
  } else if(required){
    ctx.errors.push({ task: 'Task Set not found' });
  }
  return false;
}

module.exports.populate = populate;

module.exports.validate = (ctx, isNew) => baseValidator(ctx, async () => {
  let check;

  check = ctx.checkBody('name');
  if (isNew) {
    check.notEmpty().trim();
  } else {
    check.optional().trim();
  }
  check.trim();
  check = ctx.checkBody('description');
  if (isNew) {
    check.notEmpty();
  } else {
    check.optional();
  }
  check.trim();
  check = ctx.checkBody('subjectId');
  if (isNew) {
    check.notEmpty();
  } else {
    check.optional();
  }
  check.trim();

  await populate(ctx, !isNew);

  if (ctx.errors.length > 0) {
    return false;
  }

  const { name, description, subjectId } = ctx.request.body;

  if (subjectId) {
    const subject = await subjectService.findOne({ _id: subjectId });

    if (!subject) {
      ctx.errors.push({taskSetId: 'Subject with the following id was not found'});
      return false;
    }
  }

  return { name, description, subjectId };
});
