const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    orders: [
        {
            crop: String,
            quantity: String,
            status: { type: String, default: "Pending" },
            farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" },
        }
    ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
