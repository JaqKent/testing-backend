const Note = require("../models/Notes");
const moment = require("moment");
const { validationResult } = require('express-validator');

exports.add = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });

        const { title, description, ejeX, ejeY } = req.body;

        if (!req.body.userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const newNote = new Note({
            title,
            description,
            usuarioCreador: req.body.userId,
            createDate: moment(),
            updateDate: moment(),
            ejeX,
            ejeY
        });

        const note = await newNote.save();
        res.json({ data: note });
    } catch (err) {
        next(err);
    }
};

exports.searchById = async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.id).populate([{ path: 'usuarioCreador', select: ['email'] }]);

        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }

        res.send(note);
    } catch (err) {
        next(err);
    }
};

exports.search = async (req, res, next) => {
    try {
        const { title } = req.query;

        const searchCriteria = title ? { title: { $regex: title, $options: 'i' } } : {};

        const notes = await Note.find(searchCriteria)
            .populate([{ path: 'usuarioCreador', select: ['email'] }]);

        res.send(notes);
    } catch (err) {
        next(err);
    }
};


exports.update = async (req, res, next) => {
    try {
        switch (req.body.typeUpdate) {
            case "update":
                const body = req.body;
                body.updateDate = moment();
                const noteUpdate = await Note.findByIdAndUpdate(req.params.id, body, { new: true });
                res.send(noteUpdate);
                break;
            case "updateCoordinates":
                const noteUpdateCoordinates = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
                res.send(noteUpdateCoordinates);
                break;
            case "delete":
                const noteDelete = await Note.findById(req.params.id);
                if (!noteDelete) {
                    return res.status(404).json({ msg: 'Note not found' });
                }
                noteDelete.active = false;
                await noteDelete.save();
                res.json({ message: "Note removed" });
                break;
            default:
                res.json({ message: "Debe indicar el tipo de update" });
                break;
        }
    } catch (err) {
        next(err);
    }
};
