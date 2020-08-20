const Grocery = require('../models/contents-model');
const mongoose = require('mongoose');

module.exports = {
    async createGrocery(req, res) {
        const body = req.body;

        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a grocery'
            })
        }

        const grocery = new Grocery({
            groceries: {
                _id: mongoose.Types.ObjectId(),
                member: body.member,
                description: body.description,
                completed: body.completed
            }
        });

        if (!grocery) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        try {
            await grocery.save();
            return res.status(201).json({
                success: true,
                id: grocery._id,
                message: 'Grocery created!'
            })
        } catch (err) {
            return res.status(400).json({
                err,
                message: 'Grocery not created!'
            })
        }
    }
}
}