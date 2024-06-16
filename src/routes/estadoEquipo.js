const express = require('express');
const { check } = require('express-validator');
const { obtenerEstadoEquipo, crearEstadoEquipo, actualizarEstadoEquipo, eliminarEstadoEquipo} = require('../controllers/EstadoEquipoController');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

const router = express.Router();

router.get('/estado-equipo', [ validarJWT, validarRolAdmin ], obtenerEstadoEquipo);

router.post('/estado-equipo', [ validarJWT, validarRolAdmin ], [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn([true, false]),
], crearEstadoEquipo);

router.put('/estado-equipo/:id', [ validarJWT, validarRolAdmin ], [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn([true, false]),
], actualizarEstadoEquipo)

router.delete('/estado-equipo/:id', [ validarJWT, validarRolAdmin ], eliminarEstadoEquipo);

module.exports = router;