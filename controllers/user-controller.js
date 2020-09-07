const Users = require('../models/user-model');

module.exports = {
    async addMember(req, res) {
        const body = req.body;

        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a body'
            })
        }

        Users.findOneAndUpdate(
            { _id: req.params.id },
            {
                $push: {
                    members: body.members
                }
            },
            async (err, result) => {
                if (err) {
                    return res.status(404).json({
                        err,
                        message: `unable to add member due to ${err.message}`
                    })
                }
                try {
                    await result.save();
                    return res.status(200).json({
                        success: true,
                        id: result._id,
                        message: 'Member added'
                    })
                } catch (err) {
                    return res.status(400).json({
                        err,
                        message: `unable to add member due to ${err.message}`
                    })
                }
            }
        );
    },
    async getUsers(req, res) {
        try {
            await Users.find({ email: req.params.email }, (err, user) => {
                if (err) return res.status(400).json({ success: false, error: err });
                if (!user.length) return res.status(404).json({ success: false, error: 'User not found' });
                return res.status(200).json(user);
            })
        } catch (err) {
            console.log(err);
        }
    },
    async editMemberName(req, res) {
        const body = req.body;

        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a body to update'
            })
        }

        Users.updateOne({ _id: req.params.id }, {
            $set: {
                [`members.${body.index}`]: body.members
            }
        }, async (err, result) => {
            if (err) {
                return res.status(404).json({
                    err,
                    message: `unable to edit member name due to ${err.message}`
                })
            }
            try {
                return res.status(200).json({
                    success: true,
                    id: result._id,
                    message: 'Member name updated'
                })
            } catch (err) {
                return res.status(400).json({
                    err,
                    message: `unable to update member name due to ${err.message}`
                })
            }
        })
    },
    async deleteMember(req, res) {
        try {
            await Users.updateOne({ _id: req.params.id }, {
                $pull: {
                    members: {
                        $in:    req.params.members
                    }
                }
            }, (err, result) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        error: err
                    })
                }
                if (!result) {
                    return res.status(404).json({
                        success: false,
                        error: 'User not found'
                    })
                }
                return res.status(200).json({
                    success: true,
                    data: result
                })
            })
        } catch (err) {
            console.log(err);
        }
    }
}