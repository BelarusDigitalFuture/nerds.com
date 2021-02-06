const db = require('../../services/db.service');
const schema = require('./task-option.schema');

const service = db.createService('taskOption', schema);

module.exports = service;
