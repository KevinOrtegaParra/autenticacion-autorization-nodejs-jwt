const EstadoEquipo = require('../models/EstadoEquipo');
const { request, response } = require('express');
const { validationResult } = require('express-validator');

const obtenerEstadoEquipo = async (req = request, res = response) => {
    try {
        const estadoEquipo = await EstadoEquipo.find();
        return res.json(estadoEquipo);

    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const crearEstadoEquipo = async (req = request, res = response) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const body = req.body;
        const estadoEquipo = new EstadoEquipo(body);

        await estadoEquipo.save();
        return res.status(201).json(estadoEquipo);

    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const actualizarEstadoEquipo = async (req = request, res = response) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const id = req.params.id;
        const body = req.body;
        body.fechaActualizacion = new Date();
        const estadoEquipo = await EstadoEquipo.findByIdAndUpdate(id, body, { new: true });

        return res.status(201).json(estadoEquipo);

    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const eliminarEstadoEquipo = async (req = request, res = response) => {

    try {

        const id = req.params.id;
        await EstadoEquipo.findByIdAndDelete(id);

        return res.status(204).json({
            message: 'Borrado'
        });

    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

module.exports = ({
    obtenerEstadoEquipo,
    crearEstadoEquipo,
    actualizarEstadoEquipo,
    eliminarEstadoEquipo
})