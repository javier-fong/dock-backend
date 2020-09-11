const CalendarEvent = require('../models/calendar-model');

module.exports = {
    async createEvent(req, res) {
        const body = req.body;

        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a event'
            })
        }

        const newCalendarEvent = new CalendarEvent({
            email: body.email,
            title: body.title,
            start: body.start,
            end: body.end
        })

        if (!newCalendarEvent) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        try {
            await newCalendarEvent.save();
            return res.status(201).json({
                success: true,
                id: newCalendarEvent._id,
                message: 'New calendar event created!'
            })
        } catch (err) {
            return res.status(400).json({
                err,
                message: 'New calendar event not created!'
            })
        }
    }
}