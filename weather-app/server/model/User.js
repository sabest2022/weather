const mongoose = require("mongoose");

const UserSchema = {
    name: { type: String },
    email: { type: String },
    imageUrl: { type: String },
    balance: { type: Number }
};

module.exports = mongoose.model("User", UserSchema);