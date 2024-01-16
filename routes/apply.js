const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares');

const { crearApply } = require('../controllers/apply');


const router = Router();

// router.get('/', obtenerLeads);


router.post('/',[
    // check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    // check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    // check('direccion', 'La direccion es obligatoria').not().isEmpty(),
    // check('email', 'El email es obligatorio').isEmail(),
    // check('telf', 'El telefono es obligatorio').not().isEmpty(),
    validarCampos
], crearApply);



module.exports = router;