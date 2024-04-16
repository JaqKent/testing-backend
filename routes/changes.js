const express = require('express');
const router = express.Router();
const cambiosController = require('../controller/ChangesController');

router.get('/:cambiosId/:incidenciaId', cambiosController.obtenerCambiosIncidencia);

router.get('/:cambiosId/:ventanaId', cambiosController.obtenerCambiosVentana);

router.get('/:cambiosId/:incidenciaId/:commentId', cambiosController.obtenerCambiosCommentsIncidencia);

router.get('/:cambiosId/:ventanaId/:commentId', cambiosController.obtenerCambiosCommentsVentana);


module.exports = router;
