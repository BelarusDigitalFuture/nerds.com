const { Validator } = require('jsonschema');

const validator = new Validator();

const userSchema = {
  id: '/User',
  type: 'object',
  properties: {
    _id: { type: 'string' },
    createdAt: { type: 'Date' },
    email: { type: ['string', 'null'] },
    roles: { type: 'array', default: [] },
  },
  required: ['_id', 'createdAt'],
};

module.exports = obj => validator.validate(obj, userSchema);
