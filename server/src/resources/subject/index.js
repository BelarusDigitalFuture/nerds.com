const router = require('koa-router')();
const isAuthenticated = require('../../middleware/isAuthenticated.middleware');
const controller = require('./subject.controller');

router.use(isAuthenticated);

// router.get('/', controller.getCurrent);

module.exports = router.routes();
