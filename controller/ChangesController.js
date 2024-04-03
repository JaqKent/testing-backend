const Incidencia = require('../models/Incidencia');
const Windows = require("../models/Ventanas")
const CommentsIncidencia = require("../models/CommentsIncidencias")
const CommentsVentana = require("../models/CommentsVentana");

exports.registrarCambioIncidencia = async (req, res) => {
    try {
        const { id, nuevosValores } = req.body;

        const incidencia = await Incidencia.findById(id);

        for (let campo in nuevosValores) {
            if (incidencia[campo] !== nuevosValores[campo]) {
                incidencia.cambios.push({
                    campo: campo,
                    valorAnterior: incidencia[campo],
                    valorNuevo: nuevosValores[campo],
                });

                incidencia[campo] = nuevosValores[campo];
            }
        }

        await incidencia.save();

        res.status(200).json({ message: 'Cambios registrados con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al registrar los cambios' });
    }
};

exports.obtenerCambiosIncidencia = async (req, res) => {
    try {
        const { id } = req.params;

        const incidencia = await Incidencia.findById(id);

        res.status(200).json({ cambios: incidencia.cambios });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener los cambios' });
    }
};



exports.registrarCambioVentana = async (req, nuevosValores) => {
    try {

        const { id } = req.params;

        const ventana = await Windows.findById(id);

        const cambios = [];

        for (let campo in nuevosValores) {
            if (campo === 'semana') {
                continue;
            }

            if (ventana[campo] !== nuevosValores[campo]) {

                cambios.push({
                    campo: campo,
                    valorAnterior: ventana[campo],
                    valorNuevo: nuevosValores[campo],
                });

                ventana[campo] = nuevosValores[campo];
            }
        }

        if (cambios.length > 0) {
            ventana.cambios = cambios;
        }

        await ventana.save();

        return cambios;
    } catch (error) {
        throw new Error('Hubo un error al registrar los cambios', error);
    }
};


exports.obtenerCambiosVentana = async (req, res) => {
    try {
        const { id } = req.params;

        const ventana = await Windows.findById(id);

        res.status(200).json({ cambios: ventana.cambios });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener los cambios' });
    }
};


exports.registrarCambioCommentsIncidencia = async (req, res) => {
    try {
        const { id, nuevosValores } = req.body;

        const commentsIncidencia = await CommentsIncidencia.findById(id);

        for (let campo in nuevosValores) {
            if (commentsIncidencia[campo] !== nuevosValores[campo]) {
                commentsIncidencia.cambios.push({
                    campo: campo,
                    valorAnterior: commentsIncidencia[campo],
                    valorNuevo: nuevosValores[campo],
                });

                commentsIncidencia[campo] = nuevosValores[campo];
            }
        }

        await commentsIncidencia.save();

        res.status(200).json({ message: 'Cambios registrados con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al registrar los cambios' });
    }
};

exports.obtenerCambiosCommentsIncidencia = async (req, res) => {
    try {
        const { id } = req.params;

        const commentsIncidencia = await CommentsIncidencia.findById(id);

        res.status(200).json({ cambios: commentsIncidencia.cambios });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener los cambios' });
    }
};


exports.registrarCambioCommentsVentana = async (req, res) => {
    try {
        const { id, nuevosValores } = req.body;

        const commentsVentana = await CommentsVentana.findById(id);

        for (let campo in nuevosValores) {
            if (commentsVentana[campo] !== nuevosValores[campo]) {
                commentsVentana.cambios.push({
                    campo: campo,
                    valorAnterior: commentsVentana[campo],
                    valorNuevo: nuevosValores[campo],
                });

                commentsVentana[campo] = nuevosValores[campo];
            }
        }

        await commentsVentana.save();

        res.status(200).json({ message: 'Cambios registrados con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al registrar los cambios' });
    }
};

exports.obtenerCambiosCommentsVentana = async (req, res) => {
    try {
        const { id } = req.params;

        const commentsVentana = await CommentsVentana.findById(id);

        res.status(200).json({ cambios: commentsVentana.cambios });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener los cambios' });
    }
};

