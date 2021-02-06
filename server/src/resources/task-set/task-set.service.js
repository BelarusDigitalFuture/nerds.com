const db = require('../../services/db.service');
const schema = require('./task-set.schema');

const service = db.createService('taskSet', schema);

module.exports = service;
