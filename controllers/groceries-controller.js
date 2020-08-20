const Grocery = require('../models/grocery-model');

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
            email: body.email,
            description: body.description,
            completed: body.completed
        })

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
    },
    async getGroceries(req, res) {
        try {
            await Grocery.find({ email: req.body.email }, (err, groceries) => {
                if (err) return res.status(400).json({ success: false, error: err });
                if (!groceries.length) return res.status(404).json({ success: false, error: 'Groceries not found' });
                return res.status(200).json(groceries);
            })
        } catch (err) {
            console.log(err);
        }
    },
    async updateGrocery(req, res) {
        const body = req.body;

        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a body to update'
            })
        }

        Grocery.findOne({ _id: req.params.id }, async (err, grocery) => {
            if (err) return res.status(404).json({ err, message: 'Grocery not found!' });

            grocery.description = body.description;

            try {
                await grocery.save();
                return res.status(200).json({
                    success: true,
                    id: grocery._id,
                    message: 'Grocery updated!'
                })
            } catch (err) {
                console.log(err);
                return res.status(400).json({
                    err,
                    message: 'Grocery not updated!'
                })
            }
        })
    },
    async deleteGrocery(req, res) {
        try {
            await Grocery.findOneAndDelete({ _id: req.params.id }, (err, grocery) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        error: err
                    })
                }

                if (!grocery) {
                    return res.status(404).json({
                        success: false,
                        error: 'Grocery not found'
                    })
                }

                return res.status(200).json({
                    success: true,
                    data: grocery
                })
            })
        } catch (err) {
            console.log(err)
        }
    }
}