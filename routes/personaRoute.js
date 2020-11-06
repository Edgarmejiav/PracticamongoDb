const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');


const { validarJWT } = require('../midlewares/validarJWT');
const {
    getPersonas,
    crearPersona,
    actualizarPersona,
    eliminarPersona
} = require('../controllers/personaController');


const router = Router();

router.get('/', getPersonas);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre de la persona es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido de la persona  es obligatorio').not().isEmpty(),
    check('sexo', 'El sexo de la persona  es obligatorio').not().isEmpty(),
    check('f_nacimiento', 'El f_nacimiento de la persona  es obligatorio').not().isEmpty(),
    validarCampos
], crearPersona);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre de la persona  es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido de la persona  es obligatorio').not().isEmpty(),
        check('sexo', 'El sexo de la persona  es obligatorio').not().isEmpty(),
        check('f_nacimiento', 'El f_nacimiento de la persona  es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarPersona);

router.delete('/:id',
    validarJWT,
    eliminarPersona);

module.exports = router;