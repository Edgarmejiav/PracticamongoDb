const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');
const { getLogros, actualizarLogro, eliminarLogro, crearLogro } = require('../controllers/logrosController');

const { validarJWT } = require('../midlewares/validarJWT');


const router = Router();

router.get('/', getLogros);


router.post('/', [
        validarJWT,
        check('descripcion', 'El nombre del Logro es obligatorio').not().isEmpty(),
        check('presentacion', 'El id de la presentacion debe ser valido').isMongoId(),
        validarCampos
    ],
    crearLogro);

router.put('/:id', [
        validarJWT,
        check('descripcion', 'El nombre del Logro es obligatorio').not().isEmpty(),
        check('presentacion', 'El id de la presentacion debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarLogro);

router.delete('/:id', validarJWT, eliminarLogro);

module.exports = router;