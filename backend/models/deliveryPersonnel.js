const mongoose = require('mongoose');
// Define the schema for Delivery Personnel
const deliveryPersonnelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    assignedOrders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'  // Assuming you have an Order model for linking
    }]
});

// Create the Delivery Personnel model
const DeliveryPersonnel = mongoose.model('DeliveryPersonnel', deliveryPersonnelSchema);

module.exports = DeliveryPersonnel;

