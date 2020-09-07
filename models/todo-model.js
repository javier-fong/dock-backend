const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema(
    {
        owner: String,
        toDoListName: String,
        email: [{
            type: String,
            default: ''
        }],
        assignedMembers: [{
            type: String,
            default: '',
        }],
        description: [{
            type: String,
            default: ''
        }],
        completed: Boolean
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Todo", todoSchema);