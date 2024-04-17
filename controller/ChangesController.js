const Incidencia = require('../models/Incidencia');
const Windows = require("../models/Ventanas");
const CommentsIncidencia = require("../models/CommentsIncidencias");
const CommentsVentana = require("../models/CommentsVentana");

exports.obtenerCambiosIncidencia = async (req, res) => {
    try {
        const { id } = req.params;
        const incidencia = await Incidencia.findById(id).populate('cambios');
        res.status(200).json({ cambios: incidencia.cambios });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener los cambios' });
    }
};

exports.obtenerCambiosVentanaPorFecha = async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.params;
        const cambiosVentana = await Cambio.find({
            tipoElemento: 'ventana',
            fecha: { $gte: fechaInicio, $lt: fechaFin }
        });
        const idsVentanas = cambiosVentana.map(cambio => cambio.elementoId);
        res.status(200).json({ idsVentanas });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener los cambios de la ventana por fechas' });
    }
};


exports.obtenerCommentsVentanaPorFecha = async (req, res) => {
    try {
        const { fecha } = req.params;
        const cambiosCommentVentana = await Cambio.find({ tipoElemento: 'commentVentana', fecha: { $gte: fecha, $lt: new Date(fecha).setDate(new Date(fecha).getDate() + 1) } });
        const idsComentariosVentanas = cambiosCommentVentana.map(cambio => cambio.elementoId);
        res.status(200).json({ idsComentariosVentanas });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener los comentarios de la ventana por fecha' });
    }
};

exports.obtenerCambiosCommentsIncidencia = async (req, res) => {
    try {
        const { id } = req.params;
        const commentIncidencia = await CommentsIncidencia.findById(id).populate('cambios');
        res.status(200).json({ cambios: commentIncidencia.cambios });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener los cambios' });
    }
};

exports.obtenerCambiosCommentsVentana = async (req, res) => {
    try {
        const { id } = req.params;
        const commentVentana = await CommentsVentana.findById(id).populate('cambios');
        res.status(200).json({ cambios: commentVentana.cambios });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener los cambios' });
    }
};
