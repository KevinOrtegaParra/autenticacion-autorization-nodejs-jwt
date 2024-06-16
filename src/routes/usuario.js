const express = require('express');
const { check } = require('express-validator');
const { obtenerUsuario, crearUsuario, actualizarUsuarios, eliminarUsuarios } = require('../controllers/UsuarioController');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

const router = express.Router();

router.get('/usuario', [ validarJWT, validarRolAdmin ], obtenerUsuario);

router.post('/usuario', [ validarJWT, validarRolAdmin ], [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('email', 'invalid.email').isEmail(),
    check('estado', 'invalid.estado').isIn([true, false]),
    check('password', 'invalid.password').not().isEmpty(),
    check('rol', 'invalid.rol').isIn(['Administrador', 'Docente']),
], crearUsuario);

router.put('/usuario/:id', [ validarJWT, validarRolAdmin ], [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('email', 'invalid.email').isEmail(),
    check('estado', 'invalid.estado').isIn([true, false]),
    check('password', 'invalid.password').not().isEmpty(),
    check('rol', 'invalid.rol').isIn(['Administrador', 'Docente']),
], actualizarUsuarios);

router.delete('/usuario/:id', [ validarJWT, validarRolAdmin ], eliminarUsuarios);

module.exports = router;