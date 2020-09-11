const express = require('express');
const router = express.Router();

const CalendarController = require('../controllers/calendar-controller');

router.post('/event', CalendarController.createEvent);
router.get('/events/:email', CalendarController.getEvents);

module.exports = router;