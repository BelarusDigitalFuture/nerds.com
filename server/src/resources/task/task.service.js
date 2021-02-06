const db = require('../../services/db.service');
const schema = require('./task.schema');

const service = db.createService('task', schema);

module.exports = service;
