const Marcas = require('../models/Marcas');
const { request, response } = require('express');
const {validationResult} = require('express-validator');

const obtenerMarcas = async (req = request, res = response) => {
    try {
        const marca = await Marcas.find();
        return res.json(marca);

    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const crearMarcas = async (req = request, res = response) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const body = req.body;
        const marca = new Marcas(body);
        
        await marca.save();
        return res.status(201).json(marca);

    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const actualizarMarca = async (req = request, res = response) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const id = req.params.id;
        const body = req.body;
        body.fechaActualizacion = new Date();
        const marca = await Marcas.findByIdAndUpdate(id, body, { new: true });

        return res.status(201).json(marca);

    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const eliminarMarca = async (req = request, res = response) => {

    try {

        const id = req.params.id;
        await Marcas.findByIdAndDelete(id);

        return res.status(204).json({
            message: 'Borrado'
        });

    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

module.exports = ({
    obtenerMarcas,
    crearMarcas,
    actualizarMarca,
    eliminarMarca
})