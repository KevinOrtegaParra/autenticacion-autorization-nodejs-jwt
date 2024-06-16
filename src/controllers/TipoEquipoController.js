const TipoEquipo = require('../models/TipoEquipo');
const { request, response } = require('express');
const {validationResult} = require('express-validator')

const obtenerTipoEquipo = async (req = request, res = response) => {
    try {
        const tipoEquipo = await TipoEquipo.find();
        return res.json(tipoEquipo);

    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const crearTipoEquipo = async (req = request, res = response) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const body = req.body;
        const tipoEquipo = new TipoEquipo(body);
        
        await tipoEquipo.save();
        return res.status(201).json(tipoEquipo);

    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const actualizarTipoEquipo = async (req = request, res = response) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const id = req.params.id;
        const body = req.body;
        body.fechaActualizacion = new Date();
        const tipoEquipo = await TipoEquipo.findByIdAndUpdate(id, body, { new: true });

        return res.status(201).json(tipoEquipo);

    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const eliminarTipoEquipo = async (req = request, res = response) => {

    try {

        const id = req.params.id;
        await TipoEquipo.findByIdAndDelete(id);

        return res.status(204).json({
            message: 'Borrado'
        });

    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

module.exports = ({
    obtenerTipoEquipo,
    crearTipoEquipo,
    actualizarTipoEquipo,
    eliminarTipoEquipo
})