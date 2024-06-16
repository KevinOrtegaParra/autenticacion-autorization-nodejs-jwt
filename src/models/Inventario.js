const mongoose = require('mongoose');

const InventarioSchema = mongoose.Schema({
    serial: {
        type: String,
        unique: true,
        required: true
    },
    modelo: {
        type: String,
        unique: true,
        required: true
    },
    descripción: {
        type: String,
        required: true
    },
    urlFoto: {
        type: String,
        unique: true,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    fechaCompra: {
        type: Date,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    },
    usuarioCargo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: false
    },
    marca: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Marcas',
        required: true
    },
    estadoEquipo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EstadoEquipo',
        required: true
    },
    tipoEquipo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TipoEquipo',
        required: true
    }
});

module.exports = mongoose.model('Inventario', InventarioSchema);