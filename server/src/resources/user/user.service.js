const _ = require('lodash');
const hasher = require('wordpress-hash-node');

const db = require('../../services/db.service');
const schema = require('./user.schema');

const { generateSecureToken } = require('../../helpers/security.utils');

const service = db.createService('user', schema);

service.createIndex({ email: 1 });
service.createIndex({ createdAt: -1 });

service.encryptPassword = (user) => {
  if (user.password) {
    const hash = hasher.HashPassword(user.password);
    user.passwordHash = hash.toString();
    delete user.password;
  }
}

service.createUserAccount = async ({ userData }) => {
  const signupToken = await generateSecureToken();

  const data = _.extend({}, userData, {
    roles: [],
    signupToken,
  });

  service.encryptPassword(data);

  const user = await service.create(data);
  return user;
};

service.update = async (user) => {
  service.encryptPassword(user);
  const {email, passwordHash, name, school, birthDate } = user;
  const $set = {email, passwordHash, name, school, birthDate };
  return service.findOneAndUpdate({ _id: user._id }, {$set});
}

module.exports = service;
