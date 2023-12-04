const express = require("express");
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');

const CommentsVentanaController = require("../controller/CommentsVentanaController");


router.post("/:ventanaId",
    //  auth,
    CommentsVentanaController.crearCommentVentana
);


router.get("/:ventanaId",
    // auth,
    CommentsVentanaController.obtenerCommentsVentana
);


router.get("/:ventanaId/:commentId",
    // auth,
    CommentsVentanaController.obtenerSingleCommentVentana
);


router.put("/:ventanaId/:commentId",
    //auth,
    CommentsVentanaController.actualizarCommentVentana
);


router.delete("/:commentId",
    // auth,
    CommentsVentanaController.eliminarCommentVentana
);

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error del servidor');
});

module.exports = router;
