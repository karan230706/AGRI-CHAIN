    const mongoose = require("mongoose");

    const orderSchema = new mongoose.Schema({
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer", required: true },
        crop: { type: String, required: true },
        quantity: { type: Number, required: true },
        status: { type: String, default: "Pending" } // Order status
    });

    const Order = mongoose.model("Order", orderSchema);

    module.exports = Order;
