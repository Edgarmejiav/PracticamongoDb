const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');


const { validarJWT } = require('../midlewares/validarJWT');

const {
    getPresentaciones,
    crearPresentacion,
    actualizarPresentacion,
    eliminarPresentacion
} = require('../controllers/PresentacionesController');
const { route } = require('./personaRoute');

const router = Router();

router.get('/', getPresentaciones);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre de la presentacion es obligatorio').not().isEmpty(),
    check('descripcion', 'La  descripcionde la obra es  es obligatorio').not().isEmpty(),
    check('autor', 'El autor de la presentacion es obligatorio').not().isEmpty(),
    check('persona', 'El id de la persona no es valida').isMongoId(),
    validarCampos
], crearPresentacion);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre de la presentacion es obligatorio').not().isEmpty(),
    check('descripcion', 'La  descripcionde la obra es  es obligatorio').not().isEmpty(),
    check('autor', 'El autor de la presentacion es obligatorio').not().isEmpty(),
    validarCampos
], actualizarPresentacion);

router.delete('/:id', validarJWT, eliminarPresentacion);


module.exports = router;