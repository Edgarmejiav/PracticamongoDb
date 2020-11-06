const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');


const { validarJWT } = require('../midlewares/validarJWT');
const {
    getTipos,
    crearTipo,
    actualizarTipo,
    eliminarTipo
} = require('../controllers/tipoController');


const router = Router();

router.get('/', getTipos);


router.post('/', [
        validarJWT,
        check('descripcion', 'El nombre del proyecto es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearTipo);

router.put('/:id', [
        validarJWT,
        check('descripcion', 'El nombre del proyecto es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarTipo);

router.delete('/:id',
    validarJWT,
    eliminarTipo);



module.exports = router; //para exportar