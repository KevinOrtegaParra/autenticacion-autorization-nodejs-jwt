const Inventario = require('../models/Inventario');
const { request, response } = require('express');
const { validationResult } = require('express-validator');

const obtenerInventario = async (req = request, res = response) => {
    try {
        const inventario = await Inventario.find()
            .populate([{
                path: 'usuarioCargo',
                select: 'nombre email estado'
            },{
                path: 'marca',
                select: 'nombre estado'
            },{
                path: 'estadoEquipo',
                select: 'nombre estado'
            },{
                path: 'tipoEquipo',
                select: 'nombre estado'
            }]);
        return res.json(inventario);

    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const crearInventario = async (req = request, res = response) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const existeInventarioPorSerial = await Inventario.findOne({ serial: req.body.serial });
        if (existeInventarioPorSerial) {
            return res.status(400).json({ message: 'El serial ya existe' });
        }

        const body = req.body;
        const inventario = new Inventario(body);

        await inventario.save();
        return res.status(201).json(inventario);

    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const actualizarInventario = async (req = request, res = response) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const id = req.params.id;
        const existeInventarioPorSerial = await Inventario.findOne({ serial: req.body.serial,  _id: { $ne: id }  });
        if (existeInventarioPorSerial) {
            return res.status(400).json({ message: 'El serial ya existe' });
        }

        const body = req.body;
        body.fechaActualizacion = new Date();
        const inventario = await Inventario.findByIdAndUpdate(id, body, { new: true });

        return res.status(201).json(inventario);

    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const eliminarInventario = async (req = request, res = response) => {

    try {

        const id = req.params.id;
        await Inventario.findByIdAndDelete(id);

        return res.status(204).json({
            message: 'Borrado'
        });

    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

module.exports = ({
    obtenerInventario,
    crearInventario,
    actualizarInventario,
    eliminarInventario
})