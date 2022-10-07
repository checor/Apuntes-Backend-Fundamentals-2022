const router = require('express').Router();
const {
    getGod,
    getGods,
    createGod,
    updateGod,
    deleteGod
} = require('../controllers/gods')
const auth = require('../config/auth');
const passport = require('passport');

/**
 * @swagger
 * /gods/:
 *  get:
 *      summary: Dioses disponibles.
 *      description: Entrega una lista de dioses.
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Todos los dioses disponibles.
 *              type: json
 *
 */
router.get('/', getGods);

router.get('/:id', getGod);

/**
 * @swagger
 * /gods/:
 *  post:
 *      summary: Crear dios.
 *      description: Crea un nuevo dios. Necesita autenticacion JWT.
 *      security:
 *          - bearer: []
 *      parameters:
 *          - in: body
 *            name: nombre
 *            description: Nombre del dios
 *      produces:
 *          - application/json
 *      responses:
 *          201:
 *              description: Creado correctamente.
 *              type: json
 *          401:
 *              description: Sin login.
 *              type: json
 *          403:
 *              description: No tienes permisos.
 *              type: json
 *
 */
router.post('/', [passport.authenticate('bearer', {session: false, assignProperty: 'user'}), auth.required], createGod);//auth.required, createGod);

router.patch('/:id', [auth.required, auth.isAdmin], updateGod);

router.delete('/:id', auth.isAdmin, deleteGod);

module.exports = router;
