const { Validator } = require('jsonschema');

const validator = new Validator();

//- Contest (duration, startDate, description, taskSet, ratingEnabled, author, createdAt, updatedAt, deletedAt)
const contestSchema = {
  id: '/Subject',
  type: 'object',
  properties: {
    _id: { type: 'string' },
    createdAt: { type: 'Date' },
    updatedAt: { type: 'Date' },
    deletedAt: { type: 'Date' },
    startDate: { type: 'Date' },
    endDate: { type: 'Date' },
    description: { type: ['string'] },
    taskSetId: { type: 'string' },
    subjectId: { type: 'string' },
    authorId: { type: 'string' },
    ratingEnabled: { type: 'boolean' },
    duration: { type: 'number' },
  },
  required: ['_id', 'startDate', 'endDate'],
};

module.exports = obj => validator.validate(obj, contestSchema);
