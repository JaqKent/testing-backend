const express = require('express');
const router = express.Router();
const cambiosController = require('../controller/ChangesController');

router.get('/incidencia/:id/cambios', cambiosController.obtenerCambiosIncidencia);

router.get('/ventana/:id/cambios', cambiosController.obtenerCambiosVentana);

router.get('/:incidenciaId/:commentId/cambios', cambiosController.obtenerCambiosCommentsIncidencia);

router.get('/:ventanaId/:commentId/cambios', cambiosController.obtenerCambiosCommentsVentana);


module.exports = router;
