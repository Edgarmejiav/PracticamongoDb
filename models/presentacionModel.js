const { Schema, model } = require('mongoose');


const PresentacionSchema = Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    autor: { type: String, required: true },
    img: { type: String },
    director: { type: String, required: true },
    fechaPresen: [{
        fecha: { type: Date }
    }],
    uri: [{
        tipo: { type: String },
        uri: { type: String }
    }],
    reparto: [{
        persona: { required: true, type: Schema.Types.ObjectId, ref: 'Persona' },

        personaje: { type: String, required: true }
    }],
    equipoTec: [{
        nombre: { type: String, required: true },
        ocupacion: { type: String, required: true }
    }],
    tipo: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Tipo'
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    persona: { required: true, type: Schema.Types.ObjectId, ref: 'Persona' }


}, { collection: 'presentaciones' });

PresentacionSchema.method('toJSON', function() {
    //codigo para modificar el _id por default por uid pero solo para visualizacion en 
    //la base de datos seguira igual
    const { __v, ...object } = this.toObject();

    return object;

})

module.exports = model('Presentacion', PresentacionSchema);