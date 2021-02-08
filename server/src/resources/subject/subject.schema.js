const { Validator } = require('jsonschema');

const validator = new Validator();

const subjectSchema = {
  id: '/Subject',
  type: 'object',
  properties: {
    _id: { type: 'string' },
    createdAt: { type: 'Date' },
    updatedAt: { type: 'Date' },
    deletedAt: { type: 'Date' },
    disabled: { type: 'boolean' },
    name: { type: ['string'] },
    shortName: { type: ['string'] },
  },
  required: ['_id', 'name', 'shortName'],
};

module.exports = obj => validator.validate(obj, subjectSchema);
