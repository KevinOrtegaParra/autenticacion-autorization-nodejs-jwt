const express = require('express');
const { check } = require('express-validator');
const { validarUsuario } = require('../controllers/authController');

const router = express.Router();

router.post('/auth', [
    check('email', 'invalid.email').isEmail(),
    check('password', 'invalid.password').not().isEmpty(),
], validarUsuario);

module.exports = router;