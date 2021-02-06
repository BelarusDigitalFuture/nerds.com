const { Validator } = require('jsonschema');

const validator = new Validator();

// - Task (taskSet, type (one answer, multiple answers, essay, fill-in), maxLength, maxWords, text, evaluationInformation, correctAnswerPoints, createdAt, updatedAt, deletedAt)
const taskSchema = {
  id: '/Task',
  type: 'object',
  properties: {
    _id: { type: 'string' },
    createdAt: { type: 'Date' },
    updatedAt: { type: 'Date' },
    deletedAt: { type: 'Date' },
    taskSetId: { type: ['string'] },
    type: { type: ['string'] },
    maxLength: { type: ['number', 'null'] },
    maxWords: { type: ['number', 'null'] },
    text: { type: ['string'] },
    evaluationInformation: { type: ['string', 'null'] },
    correctAnswerPoints: { type: ['number'] },
  },
  required: ['_id', 'taskSetId', 'type', 'text', 'correctAnswerPoints'],
};

module.exports = obj => validator.validate(obj, taskSchema);
