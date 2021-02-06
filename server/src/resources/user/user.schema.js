const { Validator } = require('jsonschema');

const validator = new Validator();

const userSchema = {
  id: '/User',
  type: 'object',
  properties: {
    _id: { type: 'string' },
    createdAt: { type: 'Date' },
    updatedAt: { type: 'Date' },
    deletedAt: { type: 'Date' },
    email: { type: ['string'] },
    school: { type: ['string'] },
    description: { type: ['string', 'null'] },
    birthDate: { type: ['Date', 'null'] },
    roles: { type: 'array', default: [] },
  },
  required: ['_id', 'email'],
};

module.exports = obj => validator.validate(obj, userSchema);
