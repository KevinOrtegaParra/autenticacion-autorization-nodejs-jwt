const express = require('express');
const { check } = require('express-validator');
const { obtenerTipoEquipo, crearTipoEquipo, actualizarTipoEquipo, eliminarTipoEquipo} = require('../controllers/TipoEquipoController');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

const router = express.Router();

router.get('/tipo-equipo', [ validarJWT, validarRolAdmin ], obtenerTipoEquipo);

router.post('/tipo-equipo', [ validarJWT, validarRolAdmin ], [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn([true, false]),
], crearTipoEquipo);

router.put('/tipo-equipo/:id', [ validarJWT, validarRolAdmin ], [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn([true, false]),
], actualizarTipoEquipo);

router.delete('/tipo-equipo/:id', [ validarJWT, validarRolAdmin ], eliminarTipoEquipo);

module.exports = router;