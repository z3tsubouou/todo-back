const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    admin: {
        type: Boolean,
    },
    password: {
        type: String,
        required: true,
    },
    todo: [
        {
            description: String,
            end: Boolean,
        },
    ],
});

module.exports = UserSchema;
