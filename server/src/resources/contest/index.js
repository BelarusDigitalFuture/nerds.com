const router = require('koa-router')();
const isAuthenticated = require('../../middleware/isAuthenticated.middleware');
const controller = require('./contest.controller');

router.use(isAuthenticated);

// router.get('/', controller.getCurrent);

module.exports = router.routes();
