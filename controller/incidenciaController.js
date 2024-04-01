const { validationResult } = require('express-validator');
const Incidencia = require("../models/Incidencia");
const { registrarCambioIncidencia } = require("./ChangesController");

exports.crearIncidencia = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });

        const { incidenciaNumber, descripcion, criticidad, fechaModificacion, asignado, estado, observaciones, month, enBacklog } = req.body;

        const currentYear = new Date().getFullYear();

        const incidenciaNueva = new Incidencia({
            year: currentYear,
            month,
            incidenciaNumber,
            descripcion,
            criticidad,
            fechaModificacion,
            asignado,
            estado,
            observaciones,
            enBacklog,
        });

        await incidenciaNueva.save();
        res.json(incidenciaNueva);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};


exports.getAllIncidencia = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });

        const incidencias = await Incidencia.find({});
        res.json(incidencias);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};

exports.obtenerIncidencia = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });

        const incidencia = await Incidencia.findById(req.params.id);
        if (!incidencia) {
            return res.status(404).json({ msg: "Incidencia no encontrada" });
        }

        res.json({ incidencia });
    } catch (error) {
        console.log(error);
        res.status(400).send("Error en buscar incidencia");
    }
};

exports.actualizarIncidencias = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }

        const { id } = req.params;
        const incidenciasActualizada = req.body;

        const incidencia = await Incidencia.findByIdAndUpdate(id, incidenciasActualizada, { new: true });

        if (!incidencia) {
            return res.status(404).json({ msg: 'Incidencia no encontrada' });
        }
        await registrarCambioIncidencia(id, nuevosValores);

        res.json({ incidencia });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};

exports.eliminarIncidencias = async (req, res) => {
    try {
        const incidenciasId = req.params.id;
        const incidenciaDelete = await Incidencia.findById(incidenciasId);

        if (!incidenciaDelete) {
            return res.status(404).json({ msg: 'Incidencia no encontrada' });
        }

        await Incidencia.findByIdAndDelete(incidenciasId);
        res.json({ msg: 'Incidencia eliminada' });


    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};
