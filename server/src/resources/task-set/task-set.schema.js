const { Validator } = require('jsonschema');

const validator = new Validator();

const taskSetSchema = {
  id: '/TaskSet',
  type: 'object',
  properties: {
    _id: { type: 'string' },
    createdAt: { type: 'Date' },
    updatedAt: { type: 'Date' },
    deletedAt: { type: 'Date' },
    name: { type: ['string'] },
    description: { type: ['string', 'null'] },
    subjectId: { type: ['string'] },
    authorId: { type: ['string'] },
  },
  required: ['_id', 'name', 'subjectId', 'authorId'],
};

module.exports = obj => validator.validate(obj, taskSetSchema);
