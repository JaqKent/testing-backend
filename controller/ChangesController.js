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

exports.obtenerCambiosVentana = async (req, res) => {
    try {
        const { id } = req.params;
        const ventana = await Windows.findById(id).populate('cambios');
        res.status(200).json({ cambios: ventana.cambios });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener los cambios' });
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
