const express = require("express");
const router = express.Router();
const { check } = require('express-validator');
const weekController = require('../controller/weekController');
const auth = require('../middleware/auth');

router.post('/',
    // auth,
    [
        check('week', 'El Campo es obligatorio').not().isEmpty()
    ],
    weekController.crearWeek
)

router.get('/',
    //  auth,
    weekController.getWeek
)
router.get('/:id',
    // auth,
    weekController.getSingleWeek
);

router.put('/:id',
    //  auth,
    [
        check('week', 'El Campo es obligatorio').not().isEmpty()
    ],
    weekController.updateWeek
)

router.delete('/:id',
    // auth,
    weekController.deleteWeek
)

module.exports = router;