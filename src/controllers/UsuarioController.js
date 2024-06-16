const Usuarios = require('../models/Usuarios');
const { request, response } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const obtenerUsuario = async (req = request, res = response) => {
    try {
        const usuarios = await Usuarios.find();
        return res.json(usuarios);

    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const crearUsuario = async (req = request, res = response) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const existeUsuario = await Usuarios.findOne({ email: req.body.email });
        if (existeUsuario) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const body = req.body;
        const usuario = new Usuarios(body);

        const salt = bcrypt.genSaltSync();
        const password = bcrypt.hashSync(req.body.password,salt);
        usuario.password = password;

        await usuario.save();
        return res.status(201).json(usuario);

    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const actualizarUsuarios = async (req = request, res = response) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const id = req.params.id;
        const existeUsuario = await Usuarios.findOne({ email: req.body.email, _id:{ $ne: id }});
        if (existeUsuario) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const body = req.body;
        body.fechaActualizacion = new Date();

        const salt = bcrypt.genSaltSync();
        const password = bcrypt.hashSync(req.body.password,salt);
        body.password = password;

        const usuarios = await Usuarios.findByIdAndUpdate(id, body, { new: true });

        return res.status(201).json(usuarios);

    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const eliminarUsuarios = async (req = request, res = response) => {

    try {

        const id = req.params.id;
        await Usuarios.findByIdAndDelete(id);

        return res.status(204).json({
            message: 'Borrado'
        });

    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

module.exports = ({
    obtenerUsuario,
    crearUsuario,
    actualizarUsuarios,
    eliminarUsuarios
})