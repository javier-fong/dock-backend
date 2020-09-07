const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photoJournalSchema = new Schema(
    {
        owner: String,
        email: [{
            type: String,
            default: ''
        }],
        image: String,
        caption: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("photoJournal", photoJournalSchema);