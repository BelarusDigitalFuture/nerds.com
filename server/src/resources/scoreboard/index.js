const router = require('koa-router')();
const isAuthenticated = require('../../middleware/isAuthenticated.middleware');
const controller = require('./scoreboard.controller');

router.use(isAuthenticated);

router.get('/contest/:contestId', controller.getForContest);
router.get('/subject/:subjectId', controller.getForSubject);

module.exports = router.routes();
