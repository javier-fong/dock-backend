// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const contentSchema = new Schema(
//     {
//         _id: mongoose.Schema.Types.ObjectId,
//         members: [{
//             type: String,
//             default: '',
//         }],
//         groceries: [{
//             member: [{
//                 type: String,
//                 default: '',
//             }],
//             description: String,
//             completed: Boolean
//         }],
//         events: [{
//             _id: {
//                 type: mongoose.Schema.Types.ObjectId,
//                 required: true,
//                 auto: true,
//             },
//             description: String,
//             startDate: Date,
//             endDate: Date,
//         }]
//     },
//     {
//         timestamps: true
//     }
// );

// module.exports = mongoose.model("Contents", contentSchema);