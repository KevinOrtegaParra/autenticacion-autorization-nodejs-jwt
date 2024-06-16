const Usuarios = require('../models/Usuarios');
const { request, response } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt')

const validarUsuario = async (req = request, res = response) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const usuario = await Usuarios.findOne({ email: req.body.email });
        if (!usuario) {
            return res.status(400).json({ message: 'user not found' });
        }

        const esIgual = bcrypt.compareSync(req.body.password, usuario.password);
        if(!esIgual){
            return res.status(400).json({ message: 'Incorrect password' });
        }

        //generar token
        const token = generarJWT(usuario)

        res.json({
            _id: usuario._id, nombre: usuario.nombre,
            rol: usuario.rol, email: usuario.email, access_token: token
        });

    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

module.exports = ({
    validarUsuario
})