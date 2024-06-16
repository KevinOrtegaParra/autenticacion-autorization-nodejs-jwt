const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true,
        unique: [true,"Ya existe"] 
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true,
        enum:['Administrador','Docente']
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

module.exports = mongoose.model('Usuarios',UsuariosSchema);