const mongoose = require('mongoose');

const EstadoEquipoSchema = mongoose.Schema({

    nombre: {
        type: String,
        required: true 
    },
    estado: {
        type: Boolean,
        default: true,
        required: true 
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('EstadoEquipo', EstadoEquipoSchema);