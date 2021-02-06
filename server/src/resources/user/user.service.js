const _ = require('lodash');
const hasher = require('wordpress-hash-node');

const db = require('../../services/db.service');
const schema = require('./user.schema');

const { generateSecureToken } = require('../../helpers/security.utils');

const service = db.createService('user', schema);

service.createIndex({ email: 1 });
service.createIndex({ createdAt: -1 });

service.createUserAccount = async ({ userData, ctx }) => {
  const signupToken = await generateSecureToken();

  const data = _.extend({}, userData, {
    roles: [],
    signupToken,
  });

  if (userData.password) {
    const hash = hasher.HashPassword(userData.password);
    data.passwordHash = hash.toString();
    delete data.password;
  }

  const user = await service.create(data);
  return user;
};

module.exports = service;
