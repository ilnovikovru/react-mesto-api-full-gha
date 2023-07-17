const router = require('express').Router();
const userRoutes = require('./user');
const cardRoutes = require('./card');
const { login, createUser } = require('../controllers/user');
const auth = require('../middlewares/auth');
const { signinValidation, signupValidation } = require('../validators');

router.post('/api/signin', signinValidation, login);
router.post('/api/signup', signupValidation, createUser);

router.use(auth);
router.use('/api/users', userRoutes);
router.use('/api/cards', cardRoutes);

module.exports = router;
