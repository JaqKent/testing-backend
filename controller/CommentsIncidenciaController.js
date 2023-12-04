const CommentsIncidencia = require("../models/CommentsIncidencias")
const { validationResult } = require('express-validator');

exports.crearCommentIncidencia = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });

        const { update, usuarioCreador } = req.body;
        const incidenciaId = req.params.IncidenciaId;

        const currentDate = new Date();

        const CommentsIncidenciaNueva = new CommentsIncidencia({
            fechaCreacion: currentDate,
            update,
            usuarioCreador,
            Incidencias: incidenciaId,
        });

        await CommentsIncidenciaNueva.save();

        res.json(CommentsIncidenciaNueva);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};

exports.obtenerCommentsIncidencia = async (req, res) => {
    try {
        const IncidenciaId = req.params.IncidenciaId;

        const comments = await CommentsIncidencia.find({ Incidencias: IncidenciaId }).populate('usuarioCreador');


        res.json(comments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};

exports.obtenerSingleCommentIncidencia = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const IncidenciaId = req.params.IncidenciaId;

        const comment = await CommentsIncidencia.findOne({
            _id: commentId,
            Incidencia: IncidenciaId,
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


exports.actualizarCommentIncidencia = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const { update } = req.body;

        const currentDate = new Date();

        const updatedComment = await CommentsIncidencia.findByIdAndUpdate(
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

        res.json(updatedComment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};

exports.eliminarCommentIncidencia = async (req, res) => {
    try {
        const commentId = req.params.commentId;

        const deletedComment = await CommentsIncidencia.findById(commentId);

        if (!deletedComment) {
            return res.status(404).json({ msg: 'Comentario no encontrado' });
        }

        await CommentsIncidencia.findByIdAndDelete(commentId);

        res.json({ msg: 'Comentario eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};
