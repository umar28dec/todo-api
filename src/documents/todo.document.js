const mongoose = require("mongoose");

const Todo = new mongoose.Schema({
    title: {
        type: String, required: true, trim: true, maxlength: 50,
    },
    user_id:{
        type:String, required: true, trim: true,
    }
}, {timestamps: true, versionKey: false });

module.exports = mongoose.model("todo", Todo);
