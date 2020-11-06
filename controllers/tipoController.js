const { response } = require('express');
const Tipo = require('../models/tipoModel');



const getTipos = async(req, res = response) => {

    const tipos = await Tipo.find().populate('usuario', 'nombre img');


    res.json({
        ok: true,
        tipos
    });
}
const crearTipo = async(req, res = response) => {
    const uid = req.uid;

    const tipo = new Tipo({
        usuario: uid,
        ...req.body
    });

    try {

        const tipoDB = await tipo.save();
        res.json({
            ok: true,
            tipo: tipoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }


}
const actualizarTipo = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const tipo = await Tipo.findById(id);
        if (!tipo) {
            return res.status(404).json({
                ok: true,
                msg: 'Tipo no existe'

            });
        }

        const cambiosTipo = {
            ...req.body,
            usuario: uid
        }

        const tipoActualizado = await Tipo.findByIdAndUpdate(id, cambiosTipo, { new: true });

        return res.json({
            ok: true,
            tipo: tipoActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }


}
const eliminarTipo = async(req, res = response) => {
    const id = req.params.id;

    try {

        const tipo = await Tipo.findById(id);
        if (!tipo) {
            return res.status(404).json({
                ok: true,
                msg: 'tipo no existe'

            });
        }

        await Tipo.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Tipo Eliminado'

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
    getTipos,
    crearTipo,
    actualizarTipo,
    eliminarTipo
}