const router = require('koa-router')();
const isAuthenticated = require('../../middleware/isAuthenticated.middleware');
const controller = require('./contest.controller');

router.use(isAuthenticated);

router.post('/', controller.create);
router.get('/:id', controller.getOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);


module.exports = router.routes();
