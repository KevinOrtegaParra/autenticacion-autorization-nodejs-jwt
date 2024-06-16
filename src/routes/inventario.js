const express = require('express');
const { check } = require('express-validator');
const { obtenerInventario, crearInventario, actualizarInventario, eliminarInventario } = require('../controllers/InventarioControlle');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

const router = express.Router();

router.get('/inventario', [ validarJWT ], obtenerInventario);

router.post('/inventario', [ validarJWT, validarRolAdmin ], [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('modelo', 'invalid.modelo').not().isEmpty(),
    check('descripción', 'invalid.descripción').not().isEmpty(),
    check('urlFoto', 'invalid.urlFoto').not().isEmpty(),
    check('color', 'invalid.color').not().isEmpty(),
    check('fechaCompra', 'invalid.fechaCompra').isISO8601(),
    check('precio', 'invalid.precio').isNumeric(),
    check('usuarioCargo', 'invalid.usuarioCargo').not().isEmpty(),
    check('marca', 'invalid.marca').not().isEmpty(),
    check('estadoEquipo', 'invalid.estadoEquipo').not().isEmpty(),
    check('tipoEquipo', 'invalid.tipoEquipo').not().isEmpty(),
], crearInventario);

router.put('/inventario/:id', [ validarJWT, validarRolAdmin ], [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('modelo', 'invalid.modelo').not().isEmpty(),
    check('descripción', 'invalid.descripción').not().isEmpty(),
    check('urlFoto', 'invalid.urlFoto').not().isEmpty(),
    check('color', 'invalid.color').not().isEmpty(),
    check('fechaCompra', 'invalid.fechaCompra').isISO8601(),
    check('precio', 'invalid.precio').isNumeric(),
    check('usuarioCargo', 'invalid.usuarioCargo').not().isEmpty(),
    check('marca', 'invalid.marca').not().isEmpty(),
    check('estadoEquipo', 'invalid.estadoEquipo').not().isEmpty(),
    check('tipoEquipo', 'invalid.tipoEquipo').not().isEmpty(),
], actualizarInventario);

router.delete('/inventario/:id', [ validarJWT, validarRolAdmin ], eliminarInventario);

module.exports = router;