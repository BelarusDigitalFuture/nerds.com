const { Validator } = require('jsonschema');

const validator = new Validator();

// - Answer (contest, user, task, value, manuallyVerified, verifiedBy, points, createdAt, updatedAt, deletedAt)
const answerSchema = {
  id: '/Task',
  type: 'object',
  properties: {
    _id: { type: 'string' },
    createdAt: { type: 'Date' },
    updatedAt: { type: 'Date' },
    deletedAt: { type: 'Date' },
    contestId: { type: ['string'] },
    userId: { type: ['string'] },
    taskId: { type: ['string'] },
    value: { type: ['string', 'array', 'object'] },
    manuallyVerified: { type: ['number', 'null'] },
    verifiedBy: { type: ['number', 'null'] },
    points: { type: ['number', 'null'] },
  },
  required: ['_id', 'userId', 'taskId', 'value'],
};

module.exports = obj => validator.validate(obj, answerSchema);
