const router = require('express').Router();
const { userCreationValidation, loginValidation } = require('../middlewares/joiValidation');
const { login, createUser, logout } = require('../controllers/users');
const routerUsers = require('./users');
const routerCards = require('./cards');
const auth = require('../middlewares/auth');

router.post('/signup', userCreationValidation, createUser);
router.post('/signin', loginValidation, login);

router.use(auth);

router.use('/users', routerUsers);
router.use('/cards', routerCards);
router.get('/logout', logout);

module.exports = router;
