const router = require('express').Router();
const { signUp } = require('../controllers/users');

router.post('/signUp', signUp);

module.exports = router;