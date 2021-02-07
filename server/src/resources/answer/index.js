const router = require('koa-router')();
const isAuthenticated = require('../../middleware/isAuthenticated.middleware');
const controller = require('./answer.controller');

router.use(isAuthenticated);

router.post('/', controller.createOrUpdate);
router.get('/', controller.get);
router.delete('/', controller.delete);

module.exports = router.routes();
