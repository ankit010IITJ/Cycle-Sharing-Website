const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        reuired: true
    },

    mobileNo: {
        type: Number,
        required: true
    },

    userId: {
        type: String,
        reuired: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minLength: 6
    },

    address: {
        hostelName: {
            type: String,
            maxLength: 2,
        },
        hostelLane: {
            type: String,
            maxLength: 1
        }
    }

}, {timestamps: true, versionKey: false})

module.exports = mongoose.model("User", userSchema);