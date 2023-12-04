const express = require("express");
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');

const ventanaController = require("../controller/ventanaController")

router.post("/:id",
    //  auth,
    ventanaController.crearVentanas
)

router.get('/',
    // auth,
    ventanaController.getAllWindows
);

router.get("/:id",
    // auth,
    ventanaController.obtenerVentanasPorSemana
)

router.get("/:id/:id",
    // auth,
    ventanaController.obtenerVentana
)


router.put("/:id/:id",
    //auth,
    ventanaController.actualizarVentana
)
router.delete("/:id",
    // auth,
    ventanaController.eliminarVentana
);



module.exports = router;