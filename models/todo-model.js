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
            item: {
                type: String,
                default: '',
            },
            completed: {
                type: Boolean,
                default: false
            }
        }]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Todo", todoSchema);