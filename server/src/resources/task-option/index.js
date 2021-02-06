const router = require('koa-router')();
const isAuthenticated = require('../../middleware/isAuthenticated.middleware');
const controller = require('./task-option.controller');

router.use(isAuthenticated);

router.post('/', controller.create);
router.get('/', controller.get);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router.routes();
