const express = require('express');
const router = express.Router();
const cambiosController = require('../controller/ChangesController');

router.get('/ventana/fecha/:fechaInicio/:fechaFin', cambiosController.obtenerCambiosVentanaPorFecha);
router.get('/commentsventana/fecha/:fechaInicio/:fechaFin', cambiosController.obtenerCommentsVentanaPorFecha);
router.get('/incidencia/fecha/:fechaInicio/:fechaFin', cambiosController.obtenerCambiosIncidenciaPorFecha);
router.get('/commentsincidencia/fecha/:fechaInicio/:fechaFin', cambiosController.obtenerCommentsIncidenciaPorFecha);
router.get('/ventana/:id', cambiosController.obtenerCambioVentanaPorId);
router.get('/commentsventana/:id', cambiosController.obtenerCommentVentanaPorId);
router.get('/incidencia/:id', cambiosController.obtenerCambioIncidenciaPorId);
router.get('/commentsincidencia/:id', cambiosController.obtenerCommentIncidenciaPorId);


module.exports = router;
