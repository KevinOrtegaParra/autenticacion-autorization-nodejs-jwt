const express = require('express');
const { check } = require('express-validator');
const { obtenerMarcas, crearMarcas, actualizarMarca, eliminarMarca} = require('../controllers/MarcaController');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

const router = express.Router();

router.get('/marca', [ validarJWT, validarRolAdmin ], obtenerMarcas);

router.post('/marca', [ validarJWT, validarRolAdmin ], [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn([true, false]),
], crearMarcas);

router.put('/marca/:id', [ validarJWT, validarRolAdmin ], [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn([true, false]),
], actualizarMarca);

router.delete('/marca/:id', [ validarJWT, validarRolAdmin ], eliminarMarca);

module.exports = router;