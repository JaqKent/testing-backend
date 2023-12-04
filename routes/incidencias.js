const express = require("express");
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');

const incidenciaController = require("../controller/incidenciaController")


router.post('/',
    //  auth,
    incidenciaController.crearIncidencia
)
router.get('/',
    // auth,
    incidenciaController.getAllIncidencia
);
router.get('/:id',
    // auth,
    incidenciaController.obtenerIncidencia
)
router.put('/:id',
    //auth,
    incidenciaController.actualizarIncidencias
)
router.delete('/:id',
    // auth,
    incidenciaController.eliminarIncidencias
);



module.exports = router;