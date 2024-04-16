const express = require('express');
const router = express.Router();
const cambiosController = require('../controller/ChangesController');

router.get('/:incidenciaId', cambiosController.obtenerCambiosIncidencia);

router.get('/:ventanaId', cambiosController.obtenerCambiosVentana);

router.get('/:cambiosId/:incidenciaId/:commentId', cambiosController.obtenerCambiosCommentsIncidencia);

router.get('/:ventanaId/:commentId', cambiosController.obtenerCambiosCommentsVentana);


module.exports = router;
