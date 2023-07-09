const express = require('express');
const router = express.Router();
const habitController = require('../controller/habit_controller');
const Habit = require('../model/habit');

router.post('/create', habitController.create);
router.get('/delete/:id', habitController.delete);
router.get('/:id', habitController.search);

module.exports = router;