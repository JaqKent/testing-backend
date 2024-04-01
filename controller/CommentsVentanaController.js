const CommentsVentana = require("../models/CommentsVentana")
const { validationResult } = require('express-validator');
const { registrarCambioCommentsVentana } = require('./ChangesController');
const cambiosController = require('./ChangesController');

exports.crearCommentVentana = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });

        const { update, usuarioCreador } = req.body;
        const ventanaId = req.params.ventanaId;

        const currentDate = new Date();

        const CommentsVentanaNueva = new CommentsVentana({
            fechaCreacion: currentDate,
            update,
            usuarioCreador,
            ventanas: ventanaId,
        });

        await CommentsVentanaNueva.save();

        await cambiosController.registrarCambioCommentsVentana(req, res);

        res.json(CommentsVentanaNueva);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};

exports.obtenerCommentsVentana = async (req, res) => {
    try {
        const ventanaId = req.params.ventanaId;

        const comments = await CommentsVentana.find({ ventanas: ventanaId }).populate('usuarioCreador');


        res.json(comments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};

exports.obtenerSingleCommentVentana = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const ventanaId = req.params.ventanaId;

        const comment = await CommentsVentana.findOne({
            _id: commentId,
            ventanas: ventanaId,
        }).populate('usuarioCreador');

        if (!comment) {
            return res.status(404).json({ msg: 'Comentario no encontrado' });
        }

        res.json(comment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};


exports.actualizarCommentVentana = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const { update } = req.body;

        const currentDate = new Date();

        const updatedComment = await CommentsVentana.findByIdAndUpdate(
            commentId,
            {
                update,
                fechaCreacion: currentDate,
            },
            { new: true }
        );

        if (!updatedComment) {
            return res.status(404).json({ msg: 'Comentario no encontrado' });
        }

        await registrarCambioCommentsVentana(commentId, update);

        res.json(updatedComment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};

exports.eliminarCommentVentana = async (req, res) => {
    try {
        const commentId = req.params.commentId;

        const deletedComment = await CommentsVentana.findById(commentId);

        if (!deletedComment) {
            return res.status(404).json({ msg: 'Comentario no encontrado' });
        }

        await CommentsVentana.findByIdAndDelete(commentId);

        res.json({ msg: 'Comentario eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};
