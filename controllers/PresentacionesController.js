const { response } = require('express');
//const { find } = require('../models/PresentacionsModel');
const Presentacion = require('../models/presentacionModel');



const getPresentaciones = async(req, res = response) => {
    /*'nombre descripcion autor lugar  director fechaPresen equipoTec img reparto'*/
    let presentacion = [];
    presentacion = await Presentacion.find().
    populate('persona', 'nombre apellido').
    populate('tipo', "descripcion").
    populate('usuario', 'nombre img');
    res.json({
        ok: true,
        presentacion
    });
}

const crearPresentacion = async(req, res = response) => {
    const uid = req.uid;

    const presentacion = new Presentacion({
        usuario: uid,
        ...req.body
    });
    try {

        const presentacionDB = await presentacion.save();

        res.json({
            ok: true,
            presentacion: presentacionDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }
}

const actualizarPresentacion = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const presentacion = await Presentacion.findById(id);
        if (!presentacion) {
            return res.status(404).json({
                ok: true,
                msg: 'presentacion no existe'
            });
        }
        const cambiospresentacion = {
            ...req.body,
            persona: uid
        }

        const presentacionActualizada = await Presentacion.findByIdAndUpdate(id, cambiospresentacion, { new: true });

        return res.json({
            ok: true,
            presentacion: presentacionActualizada

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}

const eliminarPresentacion = async(req, res) => {
    const id = req.params.id;

    try {
        const presentacion = await Presentacion.findById(id);
        if (!presentacion) {
            return res.status(404).json({
                ok: true,
                msg: 'presentacion no existe'
            });
        }
        await Presentacion.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Presentacion Eliminada'
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
    getPresentaciones,
    crearPresentacion,
    actualizarPresentacion,
    eliminarPresentacion
}