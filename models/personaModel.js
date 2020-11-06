const { Schema, model } = require('mongoose');

//Def inicion de las colecciones en mongoose (definicion del esquema de bd)
const PersonaSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    f_nacimiento: {
        type: Date,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    ocupacion: {
        type: String,
    },
    hobbies: [{
        descripcion: { type: String }
    }],
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'personas' });

PersonaSchema.method('toJSON', function() {
    //codigo para modificar el _id por default por uid pero solo para visualizacion en 
    //la base de datos seguira igual
    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;
    return object;

})

module.exports = model('Persona', PersonaSchema);