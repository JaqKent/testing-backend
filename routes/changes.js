const express = require('express');
const router = express.Router();
const cambiosController = require('../controllers/cambiosController');

router.post('/cambio', cambiosController.registrarCambioIncidencia);

router.get('/:id/cambios', cambiosController.obtenerCambiosIncidencia);

router.post('/cambio', cambiosController.registrarCambioVentana);

router.get('/:id/cambios', cambiosController.obtenerCambiosVentana);

router.post('/:incidenciaId/:commentId/cambio', cambiosController.registrarCambioCommentsIncidencia);

router.get('/:incidenciaId/:commentId/cambios', cambiosController.obtenerCambiosCommentsIncidencia);

router.post('/:ventanaId/:commentId/cambio', cambiosController.registrarCambioCommentsVentana);

router.get('/:ventanaId/:commentId/cambios', cambiosController.obtenerCambiosCommentsVentana);


module.exports = router;
