const { Schema, model } = require('mongoose');

const ApplySchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El Nombre es obligatorio'],
    },
    apellido: {
        type: String,
        required: [true, 'El Apellido es obligatorio'],
    },
    direccion: {
        type: String,
        required: [true, 'La Dirección es obligatoria'],
    },
    email: {
        type: String,
        required: [true, 'el Email es requerido'],
    },  
    telf: {
        type: String,
        required: [true, 'el Teléfono es requerido'],
    },
    specialty: {
        type: String,
        required: [true, 'La Especialidad es requerido'],
    },
    idFileUrl: {
        type: String,
        require: [true, 'El ID es requerido']
    },
    itinFileUrl: {
        type: String,
        require: [true, 'El ITIN es requerido']
    },
    ssFileUrl: {
        type: String,
        require: [true, 'El Social Security es requerido']
    },
    osha10FileUrl: {
        type: String,
        require: [true, 'El OSHA10 es requerido']
    },
    estado: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });


ApplySchema.methods.toJSON = function() {
    const { __v, _id, estado, ...data } = this.toObject();
    data.uid = _id
    return data;
}


module.exports = model( 'Apply', ApplySchema );
