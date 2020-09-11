const express = require('express');
const router = express.Router();

const CalendarController = require('../controllers/calendar-controller');

router.post('/event', CalendarController.createEvent);
router.get('/events/:email', CalendarController.getEvents);
router.get('/oneevent/:email', CalendarController.getOneEvent);
router.delete('/event/delete/:start/:end/:title', CalendarController.deleteEvent);

module.exports = router;