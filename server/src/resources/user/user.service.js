const db = require('../../services/db.service');
const schema = require('./user.schema');

const logger = require('../../services/logger.service');

const service = db.createService('user', schema);

service.createIndex({ username: 1 });
service.createIndex({ createdAt: -1 });

module.exports = service;
