const express = require("express");
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');

const CommentsIncidenciaController = require("../controller/CommentsIncidenciaController");


router.post("/:incidenciaId",
    //  auth,
    CommentsIncidenciaController.crearCommentIncidencia
);


router.get("/:incidenciaId",
    // auth,
    CommentsIncidenciaController.obtenerCommentsIncidencia
);


router.get("/:incidenciaId/:commentId",
    // auth,
    CommentsIncidenciaController.obtenerSingleCommentIncidencia
);


router.put("/:incidenciaId/:commentId",
    //auth,
    CommentsIncidenciaController.actualizarCommentIncidencia
);


router.delete("/:commentId",
    // auth,
    CommentsIncidenciaController.eliminarCommentIncidencia
);

module.exports = router;
