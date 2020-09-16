const PhotoJournal = require('../models/photoJournal-model');

module.exports = {
    async createJournalPost(req, res) {
        const body = req.body;

        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a body'
            })
        }

        const journalPost = new PhotoJournal({
            owner: body.owner,
            email: body.email,
            image: body.image,
            caption: body.caption
        })

        if (!journalPost) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        try {
            await journalPost.save();
            return res.status(201).json({
                success: true,
                id: journalPost._id,
                message: 'Journal post created!'
            })
        } catch (err) {
            return res.status(400).json({
                err,
                message: 'Journal post not created!'
            })
        }
    },
    async getJournalPosts(req, res) {
        try {
            await PhotoJournal.find({ email: req.params.email }, (err, posts) => {
                if (err) return res.status(400).json({ success: false, error: err });
                if (!posts.length) return res.status(404).json({ success: false, error: 'Journal posts not found' });
                return res.status(200).json(posts);
            })
        } catch (err) {
            console.log(err);
        }
    },
    async getThreeJournalPost(req, res) {
        try {
            await PhotoJournal.find({ email: req.params.email }).sort({ _id: -1 }).limit(3).exec((err, post) => {
                if (err) return res.status(400).json({ success: false, error: err });
                if (!post.length) return res.status(404).json({ success: false, error: 'Journal post not found' });
                return res.status(200).json(post);
            })
        } catch(err) {
            console.log(err)
        }
    },
    async editJournalPost(req, res) {
        const body = req.body;

        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a body to edit'
            })
        }

        PhotoJournal.findOne({ _id: req.params.id }, async (err, post) => {
            if (err) return res.status(404).json({ err, message: 'Journal post not found!' });

            post.caption = body.caption;

            try {
                await post.save();
                return res.status(200).json({
                    success: true,
                    id: post._id,
                    message: 'Journal post updated!'
                })
            } catch (err) {
                console.log(err);
                return res.status(400).json({
                    err,
                    message: 'Journal post not updated!'
                })
            }
        })
    },
    async deleteJournalPost(req, res) {
        try {
            await PhotoJournal.findOneAndDelete({ _id: req.params.id }, (err, post) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        error: err
                    })
                }

                if (!post) {
                    return res.status(404).json({
                        success: false,
                        error: 'Journal post not found'
                    })
                }

                return res.status(200).json({
                    success: true,
                    data: post
                })
            })
        } catch (err) {
            console.log(err)
        }
    }
}