const { response } = require('express');
const Logro = require('../models/logrosModel');

//
const getLogros = async(req, res = response) => {
    const logros = await Logro.find().
    populate('usuario', 'nombre img').
    populate('presentacion');

    res.json({
        ok: true,
        logros
    });
}
const crearLogro = async(req, res = response) => {
    const uid = req.uid;

    const logro = new Logro({
        usuario: uid,
        ...req.body
    });

    try {

        const logroDB = await logro.save();
        res.json({
            ok: true,
            logro: logroDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }
}
const actualizarLogro = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const logro = await Logro.findById(id);
        if (!logro) {
            return res.status(404).json({
                ok: true,
                msg: 'Logro no existe'

            });
        }

        const cambiosLogro = {
            ...req.body,
            usuario: uid
        }

        const logroActualizado = await Logro.findByIdAndUpdate(id, cambiosLogro, { new: true });

        return res.json({
            ok: true,
            logro: logroActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}
const eliminarLogro = async(req, res = response) => {
    const id = req.params.id;

    try {

        const logro = await Logro.findById(id);
        if (!logro) {
            return res.status(404).json({
                ok: true,
                msg: 'Logro no existe'

            });
        }

        await Logro.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Logro Eliminado'

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}


module.exports = {
    getLogros,
    crearLogro,
    actualizarLogro,
    eliminarLogro
}