const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const grocerySchema = new Schema(
    {
        email: [{
            type: String,
            default: ''
        }],
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

module.exports = mongoose.model("Groceries", grocerySchema);