const { response } = require('express');
const Persona = require('../models/personaModel');


const getPersonas = async(req, res = response) => {

    const persona = await Persona.find().populate('usuario', 'nombre apellido img f_nacimiento sexo ocupacion');

    res.json({
        ok: true,
        persona
    });
}

const crearPersona = async(req, res = response) => {
    const uid = req.uid;

    const persona = new Persona({
        usuario: uid,
        ...req.body
    });

    try {

        const mejiaDB = await persona.save();
        res.json({
            ok: true,
            persona: mejiaDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }


}
const actualizarPersona = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const persona = await Persona.findById(id);
        if (!persona) {
            return res.status(404).json({
                ok: true,
                msg: 'Persona no existe'

            });
        }

        const cambiosPersona = {
            ...req.body,
            usuario: uid
        }

        const personaActualizado = await Persona.findByIdAndUpdate(id, cambiosPersona, { new: true });

        return res.json({
            ok: true,
            persona: personaActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }


}
const eliminarPersona = async(req, res = response) => {
    const id = req.params.id;

    try {

        const persona = await Persona.findById(id);
        if (!persona) {
            return res.status(404).json({
                ok: true,
                msg: 'Persona no existe'

            });
        }

        await Persona.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Persona Eliminada'

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
    getPersonas,
    crearPersona,
    actualizarPersona,
    eliminarPersona
}