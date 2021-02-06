const db = require('../../services/db.service');
const schema = require('./contest.schema');

const service = db.createService('contest', schema);

module.exports = service;
