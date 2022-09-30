const router = require('express').Router();
const {
    getGod,
    getGods,
    createGod,
    updateGod,
    deleteGod
} = require('../controllers/gods')
const auth = require('../config/auth');

router.get('/', auth.optional, getGods);
router.get('/:id', auth.optional, getGod);
router.post('/', auth.required, createGod);
router.patch('/:id', auth.required, updateGod);
router.delete('/:id', auth.required, deleteGod);

module.exports = router;