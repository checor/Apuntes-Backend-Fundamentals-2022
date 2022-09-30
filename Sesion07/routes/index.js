const router = require('express').Router();
const gods = require('./gods');
const users = require('./users');

router.get('/', (req, res) => {
    res.json({'info': 'Welcome to gods API!'})
});

router.use('/gods', gods);
router.use('/users', users);

module.exports = router;
