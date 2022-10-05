const router = require('express').Router();
const {
    getGod,
    getGods,
    createGod,
    updateGod,
    deleteGod
} = require('../controllers/gods')
const auth = require('../config/auth');

router.get('/', getGods);
router.get('/:id', getGod);
router.post('/', auth.required, createGod);
router.patch('/:id', auth.required, updateGod);
router.delete('/:id', auth.isAdmin, deleteGod);

module.exports = router;