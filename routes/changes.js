const express = require('express');
const router = express.Router();
const cambiosController = require('../controller/ChangesController');

router.post('/incidencia/cambio', cambiosController.registrarCambioIncidencia);

router.get('/incidencia/:id/cambios', cambiosController.obtenerCambiosIncidencia);

router.post('/ventana/cambio', cambiosController.registrarCambioVentana);

router.get('/ventana/:id/cambios', cambiosController.obtenerCambiosVentana);

router.post('/:incidenciaId/:commentId/cambio', cambiosController.registrarCambioCommentsIncidencia);

router.get('/:incidenciaId/:commentId/cambios', cambiosController.obtenerCambiosCommentsIncidencia);

router.post('/:ventanaId/:commentId/cambio', cambiosController.registrarCambioCommentsVentana);

router.get('/:ventanaId/:commentId/cambios', cambiosController.obtenerCambiosCommentsVentana);


module.exports = router;
