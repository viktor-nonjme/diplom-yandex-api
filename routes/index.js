const router = require('express').Router();
const error = require('./error');
const users = require('./users');
const articles = require('./articles');
const usersController = require('../controllers/users');

router.use('/signup', usersController.createUser);
router.use('/signin', usersController.login);

router.use('/users', users);
router.use('/articles', articles);
router.use(error);

module.exports = router;
