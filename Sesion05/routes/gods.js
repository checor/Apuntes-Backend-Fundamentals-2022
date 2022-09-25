const router = require('express').Router();
const {
    getGod,
    getGods,
    createGod,
    updateGod,
    deleteGod
} = require('../controllers/gods')

router.get('/', getGods);
router.get('/:id', getGod);
router.post('/', createGod);
router.patch('/:id', updateGod);
router.delete('/:id', deleteGod);

module.exports = router;