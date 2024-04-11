const Incidencia = require('../models/Incidencia');
const Windows = require("../models/Ventanas")
const CommentsIncidencia = require("../models/CommentsIncidencias")
const CommentsVentana = require("../models/CommentsVentana");
const cambio = require("../models/Changes")

exports.registrarCambioIncidencia = async (req, res) => {
    try {
        const { id, nuevosValores } = req.body;

        const incidencia = await Incidencia.findById(id);

        const cambio = new Cambio({
            elementoId: incidencia._id,
            tipoElemento: 'incidencia',
            cambios: nuevosValores
        });

        await cambio.save();

        incidencia.cambios.push(cambio._id);
        await incidencia.save();

        res.status(200).json({ message: 'Cambio registrado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al registrar el cambio' });
    }
};

exports.obtenerCambiosIncidencia = async (req, res) => {
    try {
        const { id } = req.params;

        const incidencia = await Incidencia.findById(id).populate('cambios');

        res.status(200).json({ cambios: incidencia.cambios });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener los cambios' });
    }
};




exports.registrarCambioVentana = async (req, res) => {
    try {
        const { id, nuevosValores } = req.body;

        const ventana = await Windows.findById(id);

        const cambio = new Cambio({
            elementoId: ventana._id,
            tipoElemento: 'ventana',
            cambios: nuevosValores
        });

        await cambio.save();

        ventana.cambios.push(cambio._id);
        await ventana.save();

        res.status(200).json({ message: 'Cambio registrado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al registrar el cambio' });
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



exports.registrarCambioCommentsIncidencia = async (req, res) => {
    try {
        const { id, nuevosValores } = req.body;

        const commentIncidencia = await CommentsIncidencia.findById(id);

        const cambio = new Cambio({
            elementoId: commentIncidencia._id,
            tipoElemento: 'comment_incidencia',
            cambios: nuevosValores
        });

        await cambio.save();

        commentIncidencia.cambios.push(cambio._id);
        await commentIncidencia.save();

        res.status(200).json({ message: 'Cambio registrado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al registrar el cambio' });
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


exports.registrarCambioCommentsVentana = async (req, res) => {
    try {
        const { id, nuevosValores } = req.body;

        const commentVentana = await CommentsVentana.findById(id);

        const cambio = new Cambio({
            elementoId: commentVentana._id,
            tipoElemento: 'comment_ventana',
            cambios: nuevosValores
        });

        await cambio.save();

        commentVentana.cambios.push(cambio._id);
        await commentVentana.save();

        res.status(200).json({ message: 'Cambio registrado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al registrar el cambio' });
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
