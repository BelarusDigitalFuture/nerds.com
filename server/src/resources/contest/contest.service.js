const db = require('../../services/db.service');
const schema = require('./contest.schema');

const service = db.createService('subject', schema);

module.exports = service;
