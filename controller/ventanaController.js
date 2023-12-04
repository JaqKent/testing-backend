const Usuario = require('../models/Usuario');
const bcryptsjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const Week = require('../models/Week');
const Windows = require('../models/Ventanas');

exports.crearVentanas = async (req, res) => {
    try {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json({ errores: error.array() });
        }

        const myWeek = await Week.findById(req.params.id);

        if (!myWeek) {
            return res.status(404).json({ msg: "Semana no encontrada" });
        }

        const { enBacklog, ...restoCampos } = req.body;
        console.log("Valor de enBacklog en el backend:", enBacklog);

        const ventanaNueva = new Windows({
            ...restoCampos,
            semana: myWeek,
            weekId: req.params.id,
            enBacklog,
        });

        await ventanaNueva.save();

        res.json({ ventanaNueva });
    } catch (error) {
        console.log(error);
        res.status(400).send("Error en Crear Ventana");
    }
};


exports.getAllWindows = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty())
            return res.status(400).json({ errores: error.array() });

        // Obtener todas las ventanas de la base de datos
        const ventanas = await Windows.find();

        res.json(ventanas);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};


// obterner tareas por proyecto

exports.obtenerVentanasPorSemana = async (req, res) => {
    try {
        const error = validationResult(req);

        if (!error.isEmpty())
            return res.status(400).json({ errores: error.array() });

        const ventanas = await Windows.find({ semana: req.params.id });

        if (ventanas.length === 0) {
            return res.status(404).json({ msg: "No se encontraron ventanas asociadas a la semana" });
        }

        res.json(ventanas);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error en Buscar Ventanas");
    }
};


exports.obtenerVentana = async (req, res) => {
    try {
        const error = validationResult(req);

        if (!error.isEmpty())
            return res.status(400).json({ errores: error.array() });

        const ventana = await Windows.findById(req.params.id);

        if (!ventana) {
            return res.status(404).json({ msg: "Ventana no encontrada" });
        }

        res.json({ ventana });
    } catch (error) {
        console.log(error);
        res.status(400).send("Error en Buscar Ventana");
    }
};


exports.actualizarVentana = async (req, res) => {

    try {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json({ errores: error.array() });
        }

        const { enBacklog, semanaDestino, semana, solicitante, descripcion, estado, fechaImplementacion, urgencia, crq, ejecutaTarea, controla, pruebasPost, afectaIdp, impactoNotificacion, ...restoDatos } = req.body;

        const ventanaActualizada = {};

        if (enBacklog !== undefined) {
            ventanaActualizada.enBacklog = enBacklog;
        }

        if (semana) {
            ventanaActualizada.semana = semana;
        }

        if (solicitante) {
            ventanaActualizada.solicitante = solicitante;
        }

        if (descripcion) {
            ventanaActualizada.descripcion = descripcion;
        }

        if (estado) {
            ventanaActualizada.estado = estado;
        }

        if (fechaImplementacion) {
            ventanaActualizada.fechaImplementacion = fechaImplementacion;
        }

        if (urgencia) {
            ventanaActualizada.urgencia = urgencia;
        }

        if (crq) {
            ventanaActualizada.crq = crq;
        }

        if (ejecutaTarea) {
            ventanaActualizada.ejecutaTarea = ejecutaTarea;
        }

        if (controla) {
            ventanaActualizada.controla = controla;
        }

        if (pruebasPost) {
            ventanaActualizada.pruebasPost = pruebasPost;
        }

        if (afectaIdp) {
            ventanaActualizada.afectaIdp = afectaIdp;
        }

        if (impactoNotificacion) {
            ventanaActualizada.impactoNotificacion = impactoNotificacion;
        }



        const { id } = req.params;

        const ventana = await Windows.findByIdAndUpdate(id, ventanaActualizada, { new: true });

        if (!ventana) {
            return res.status(404).json({ msg: 'Ventana no encontrada' });
        }

        res.json({ ventana });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};

exports.eliminarVentana = async (req, res) => {
    try {
        const ventanaId = req.params.id;

        // Buscar si la ventana existe en la base de datos
        const ventana = await Windows.findById(ventanaId);
        if (!ventana) {
            return res.status(404).json({ msg: 'Ventana no encontrada' });
        }

        await Windows.findByIdAndDelete(ventanaId);

        res.json({ msg: 'Ventana eliminada' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};
