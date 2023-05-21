const mongoose = require("mongoose");

const { Schema } = mongoose;

const HobbySchema = new Schema({
    name: String,
    date: Date.now
});

module.exports = mongoose.model("Hobbies", HobbySchema);