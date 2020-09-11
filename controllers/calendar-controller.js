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
    },
    async getEvents(req, res) {
        try {
            await CalendarEvent.find({ email: req.params.email }, '-email', (err, events) => {
                if (err) return res.status(400).json({ success: false, error: err });
                if (!events.length) return res.status(404).json({ success: false, error: 'Calendar events not found' });
                return res.status(200).json(events);
            })
        } catch (err) {
            console.log(err);
        }
    },
    async deleteEvent(req, res) {
        try {
            await CalendarEvent.findOneAndDelete({ start: req.params.start, end:req.params.end, title: req.params.title }, (err, event) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        error: err
                    })
                }

                if (!event) {
                    return res.status(404).json({
                        success: false,
                        error: 'Event not found'
                    })
                }

                return res.status(200).json({
                    success: true,
                    data: event
                })
            })
        } catch (err) {
            console.log(err)
        }
    }
}