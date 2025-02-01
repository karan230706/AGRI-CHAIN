const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    location: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },  // Rating from 1 to 5
    crops: [{ type: String, required: true }] // Array of crops the farmer offers
});

const Farmer = mongoose.model("Farmer", farmerSchema);

module.exports = Farmer;
