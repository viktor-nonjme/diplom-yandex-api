const { celebrate } = require('celebrate');
const router = require('express').Router();
const usersController = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { loginSchema } = require('../joi-schemas');
const { registrationSchema } = require('../joi-schemas');

router.post('/', celebrate({ body: registrationSchema }), usersController.createUser);
router.post('/', celebrate({ body: loginSchema }), usersController.login);

router.use(auth);

router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUser);

module.exports = router;
