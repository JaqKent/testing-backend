const express = require("express");
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');

const NoteController = require("../controller/noteController")

router.post('/', NoteController.add);
router.get('/', NoteController.search);
router.get('/:id', NoteController.searchById);
router.put('/:id', NoteController.update);

module.exports = router;