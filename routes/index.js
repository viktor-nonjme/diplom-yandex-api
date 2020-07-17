const { errors } = require('celebrate');

const router = require('express').Router();
const error = require('./error');
const users = require('./users');
const articles = require('./articles');
const usersController = require('../controllers/users');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const { errorHandler } = require('../middlewares/error-handler');
const limiter = require('../middlewares/limiter');

router.use(requestLogger);
router.use(limiter);

router.use('/signup', usersController.createUser);
router.use('/signin', usersController.login);

router.use('/users', users);
router.use('/articles', articles);
router.use(error);

router.use(errorLogger);
router.use(errors());
router.use(errorHandler);

module.exports = router;
