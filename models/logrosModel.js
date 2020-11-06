const { Schema, model } = require('mongoose');


const LogrosSchema = Schema({
    descripcion: {
        type: String,
        required: true
    },
    lugar: {
        type: String,
    },
    fecha: {
        type: Date,
    },
    presentacion: {
        type: Schema.Types.ObjectId,
        ref: 'Presentacion',
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
}, { collection: 'logros' });


LogrosSchema.method('toJSON', function() {
    //codigo para modificar el _id por default por uid pero solo para visualizacion en 
    //la base de datos seguira igual
    const { __v, ...object } = this.toObject();

    return object;

})

//para poder exponer esta definicion  para que pueda ser utilizado desde fuera

module.exports = model('Logros', LogrosSchema);