const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema(
    {
        email: String,
        members: [{
            type: String,
            default: '',
        }],
        description: String,
        completed: Boolean
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Todo", todoSchema);