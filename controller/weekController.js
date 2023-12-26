const Week = require('../models/Week');
const bcryptsjs = require('bcryptjs');
const moment = require('moment');
const { validationResult } = require('express-validator');
const Windows = require('../models/Ventanas');


exports.crearWeek = async (req, res) => {
    try {
        const error = validationResult(req); // genera un array

        if (!error.isEmpty()) return res.status(400).json({ errores: error.array() });

        const { month, startDate, endDate } = req.body;


        const currentYear = new Date().getFullYear();

        const weekNueva = new Week({
            year: currentYear,
            month,
            startDate: moment(startDate).toDate(),  // Convierte la cadena a un objeto Date
            endDate: moment(endDate).toDate(),
        });

        await weekNueva.save();

        res.json(weekNueva);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};




exports.getWeek = async (req, res) => {
    try {
        let weeks;
        weeks = await Week.find({});

        //Si la semana no tiene ventanas manda el mensaje
        if (weeks.length === 0) {
            return res.status(404).json({ msg: "No se ha creado ventana de trabajo para esta semana" });
        }

        res.send(weeks);

    } catch (error) {
        console.log(error);
    }
}

exports.getSingleWeek = async (req, res) => {
    try {
        const weekId = req.params.id;

        const week = await Week.findById(weekId);

        if (!week) {
            return res.status(404).json({ msg: 'Semana no encontrada' });
        }

        const ventanas = await Windows.find({ semana: weekId });

        let response = { week: week.toObject() };

        if (ventanas.length === 0) {
            response.msg = 'No se ha creado ventana de trabajo para esta semana';
        } else {
            response.ventanas = ventanas;
        }

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};



exports.updateWeek = async (req, res) => {
    try {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json({ errores: error.array() });
        }

        const { week } = req.body;

        const weekActualizada = {};

        if (week) {
            if (week.startDate) {
                weekActualizada.startDate = new Date(week.startDate);

            }

            if (week.endDate) {
                weekActualizada.endDate = new Date(week.endDate);

            }
        }

        const filtro = { _id: req.params.id };
        const myUpdate = { week: weekActualizada };

        await Week.findOneAndUpdate(filtro, myUpdate);
        let weekUpdate = await Week.findById(filtro);

        res.json({ weekUpdate });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Hubo un error en el servidor" });
    }
};



exports.deleteWeek = async (req, res) => {
    try {
        const weekId = req.params.id;
        // eliminar proyecto por id

        // buscar si el proyecto existe, buscar por id
        // buscar el proyecto en la DB por _id de proyecto que viene por params
        let weekDelete = await Week.findById(weekId)

        //validar existencia de la busqueda
        if (!weekDelete) {
            return res.status(404).json({ msg: "semana no encontrada" })
        }

        await Week.findByIdAndDelete(weekId)

        res.json({ msg: "Semana eliminada" })


    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Error del servidor" })
    }
}