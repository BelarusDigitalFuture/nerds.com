const { Validator } = require('jsonschema');

const validator = new Validator();

//(task, label, isCorrect, createdAt, updatedAt, deletedAt)
const taskOptionSchema = {
  id: '/TaskOption',
  type: 'object',
  properties: {
    _id: { type: 'string' },
    createdAt: { type: 'Date' },
    updatedAt: { type: 'Date' },
    deletedAt: { type: 'Date' },
    taskId: { type: ['string'] },
    label: { type: ['string'] },
    isCorrect: { type: ['boolean'] },
  },
  required: ['_id', 'taskId', 'label', 'isCorrect'],
};

module.exports = obj => validator.validate(obj, taskOptionSchema);
