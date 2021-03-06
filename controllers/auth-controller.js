const User = require('../models/user-model');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

module.exports = {
    async googleLogin(req, res) {
        const { tokenId } = req.body;

        try {
            const response = await client.verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID });
            const { email_verified, given_name, family_name, email, picture } = response.payload;

            if (email_verified) {
                try {
                    await User.findOne({ email }, (err, user) => {
                        if (err) {
                            return res.status(400).json({ err, message: 'Something went wrong..' })
                        } else {
                            if (user) {
                                const token = jwt.sign({ _id: user._id }, process.env.JWT_SIGNIN_KEY, { expiresIn: '7d' });
                                const { _id, firstName, lastName, email, picture, members } = user;

                                res.json({
                                    token,
                                    user: {
                                        _id,
                                        firstName,
                                        lastName,
                                        picture,
                                        email,
                                        members
                                    }
                                })
                            } else {
                                let password = email + process.env.JWT_SIGNIN_KEY;
                                let newUser = new User({
                                    firstName: given_name,
                                    lastName: family_name,
                                    members: given_name,
                                    picture,
                                    email,
                                    password
                                });
                                newUser.save((err, data) => {
                                    if (err) {
                                        return res.status(400).json({ err, message: 'User not saved' })
                                    }
                                    const token = jwt.sign({ _id: data._id }, process.env.JWT_SIGNIN_KEY, { expiresIn: '7d' });
                                    const { _id, firstName, lastName, email } = newUser;

                                    res.json({
                                        token,
                                        user: {
                                            _id,
                                            firstName,
                                            lastName,
                                            email
                                        }
                                    })
                                })
                            }
                        }
                    })
                } catch (err) {
                    console.log(err)
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
}