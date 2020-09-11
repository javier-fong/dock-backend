const express = require('express');
const router = express.Router();

const CalendarController = require('../controllers/calendar-controller');

router.post('/event', CalendarController.createEvent);

module.exports = router;