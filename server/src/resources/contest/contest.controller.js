const _ = require('lodash');
const contestService = require('./contest.service');
const contestHelper = require('./contest.helper');
const contestValidator = require('./validators/contest.validator');

module.exports.create = async (ctx) => {
  const authorId = ctx.state.user._id;

  const data = await contestValidator(ctx);

  if (!data.isValid) {
    return;
  }

  const {
    startDate, endDate, ratingEnabled,
    taskSetId, description, subjectId,
  } = data;

  const contest = await contestService.create({
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    ratingEnabled,
    taskSetId,
    subjectId,
    authorId,
    description,
  });

  ctx.body = {
    ...contestHelper.format(contest),
  };
};

module.exports.getOne = async (ctx) => {
  const contest = await contestService.findOne({
    _id: ctx.params.id,
  });

  ctx.body = {
    ...contestHelper.format(contest),
  };
};

module.exports.get = async (ctx) => {
  const { subjectId } = ctx.request.query;

  const contests = await contestService.find({
    ratingEnabled: true,
    endDate: { $gt: new Date()},
    ...(subjectId && { subjectId }),
  });

  ctx.body = {
    results: contestHelper.formatArray(contests.results)
  };
};

module.exports.update = async (ctx) => {
  const data = await contestValidator(ctx);

  if (!data.isValid) {
    return;
  }
  const {
    startDate, endDate, description,
    ratingEnabled, taskSetId,
  } = data;


  const updatedContest = await contestService.updateEntity(ctx.params.id,  {
    startDate, endDate, description,
    ratingEnabled, taskSetId,
  });

  ctx.body = {
    ...contestHelper.format(updatedContest),
  };
};

module.exports.delete = async (ctx) => {
  await contestService.remove({ _id: ctx.params.id });

  ctx.body = {
    success: true,
  };
};
