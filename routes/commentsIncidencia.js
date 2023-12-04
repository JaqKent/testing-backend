const express = require("express");
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');

const CommentsIncidenciaController = require("../controller/CommentsIncidenciaController");


router.post("/:id",
    //  auth,
    CommentsIncidenciaController.crearCommentIncidencia
);


router.get("/:id",
    // auth,
    CommentsIncidenciaController.obtenerCommentsIncidencia
);


router.get("/:id/:id",
    // auth,
    CommentsIncidenciaController.obtenerSingleCommentIncidencia
);


router.put("/id/:id",
    //auth,
    CommentsIncidenciaController.actualizarCommentIncidencia
);


router.delete("/:id",
    // auth,
    CommentsIncidenciaController.eliminarCommentIncidencia
);

module.exports = router;
