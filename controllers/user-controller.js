const Users = require('../models/user-model');
const passport = require("passport");
const bcrypt = require("bcryptjs");

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
                        $in: req.params.members
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
    },
    login(req, res, next) {
        passport.authenticate("local", (err, user, info) => {
            if (err) throw err;
            if (!user) res.status(400).send("No User Exists");
            else {
                req.login(user, (err) => {
                    if (err) throw err;
                    res.status(201).send("Successfully Authenticated");
                })
            }
        })(req, res, next);
    },
    async register(req, res) {
        try {
            await Users.findOne({ email: req.body.email }, async (err, doc) => {
                if (err) throw err;
                if (doc) return res.status(201).json({ data: doc })
                if (!doc) {
                    try {
                        await bcrypt.hash(req.body.password, 10);

                        const newUser = new Users({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: req.body.password,
                            members: req.body.members
                        });
                        await newUser.save();
                        res.status(201).send('User created!');
                    } catch (err) {
                        console.log(err)
                    }
                }
            });
        } catch (err) {
            console.log(err)
        }
    },
    logout(req, res) {
        req.logout();
        res.status(200).send('User logged out!');
    }
}