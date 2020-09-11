const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const calendarSchema = new Schema(
    {
        email: [{
            type: String,
            default: ''
        }],
        title: String,
        start: Date,
        end: Date
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("calendar", calendarSchema);