const mongoose = require("mongoose");

const User = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    email: { type: String, unique: true },
    password: { type: String },
}, {timestamps: true});

module.exports = mongoose.model("user", User);
