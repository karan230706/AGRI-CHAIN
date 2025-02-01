const mongoose = require("mongoose");
require("dotenv").config(); // to load MONGO_URI from .env file

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Farmer = require("./models/Farmer");
const Order = require("./models/Order");
const User = require('./models/User'); 
const DeliveryPersonnel = require("./models/DeliveryPersonnel");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Create new farmer
app.post("/api/farmers", async (req, res) => {
    try {
        const { name, contact, location, rating, crops}  = req.body;
        // Validate Input
        if (!name || !contact || !location || !crops) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        
        const farmer = new Farmer({ name, contact, location, rating, crops });
        await farmer.save();
        res.status(201).json(farmer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
  
// Get all farmers
app.get("/api/farmers", async (req, res) => {
  try {
    const farmers = await Farmer.find();
    res.json(farmers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific farmer by ID
app.get("/api/farmers/:id", async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.id);
    if (!farmer) return res.status(404).json({ message: "Farmer not found"});
    res.json(farmer);
  } catch (err) {
    res.status(500).json({message: err.message });
  }
});

// Update a farmer
app.put("/api/farmers/:id", async (req, res) => {
  try {
    const { name, contact, location, rating, crops } = req.body;
    const updateData = { name,contact, location, rating, crops};

    const farmer = await Farmer.findByIdAndUpdate(req.params.id, updateData, { new: true});

    if (!farmer) return res.status(404).json({ message: "Farmer not found" });
    res.json(farmer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a farmer
app.delete("/api/farmers/:id", async (req, res) => {
    try {
      const farmer = await Farmer.findByIdAndDelete(req.params.id);
      if (!farmer) return res.status(404).json({ message: "Farmer not found" });
      res.json({ message: "Farmer deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});
// Create a new user
app.post("/api/users", async (req, res) => {
  const { name, email, location } = req.body;

  // Validate Input
  if (!name || !email || !location) {
      return res.status(400).json({ message: "Missing required fields" });
  }

  try {
      const user = new User({ name, email, location });
      await user.save();
      res.status(201).json(user); // Return the user with the valid MongoDB `_id`
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find(); // Make sure User is defined somewhere
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB");

    // Start the server after successful DB connection
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch((err) => console.log("Failed to connect to MongoDB", err));

app.get("/farmers/db", async (req, res) => {
    try{
        const farmers= await Farmer.find();
        res.json(farmers);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch farmers"});
    }
});

app.post("/place-order", async (req, res) => {
    const { userId, farmerId, crop, quantity } = req.body;

    if (!userId || !farmerId || !crop || !quantity) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const newOrder = new Order({ userId, farmerId, crop, quantity });
        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    }  catch (err) {
        res.status(500).json({error: "Failed to place order"});
    }
});

app.get("/orders", async (req, res) => {
    try {
        const allOrders= await Order.find();
        res.json(allOrders);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch orders"});
    }
});
// Get a specific order by ID
app.get("/api/orders/:id", async (req, res) => {
  try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: "Order not found" });
      res.json(order);
  } catch (err) {
      res.status(500).json({ error: "Failed to fetch the order" });
  }
});
// Update an order (e.g., marking as delivered)
app.put("/api/orders/:id", async (req, res) => {
  const { status, deliveryDate } = req.body;
  try {
      const order = await Order.findByIdAndUpdate(req.params.id, { status, deliveryDate }, { new: true });
      if (!order) return res.status(404).json({ message: "Order not found" });
      res.json(order);
  } catch (err) {
      res.status(400).json({ error: "Failed to update the order" });
  }
});

// Delete an order
app.delete("/api/orders/:id", async (req, res) => {
  try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) return res.status(404).json({ message: "Order not found" });
      res.json({ message: "Order deleted successfully" });
  } catch (err) {
      res.status(500).json({ error: "Failed to delete the order" });
  }
});
// Create a new delivery personnel
app.post("/api/delivery-personnel", async (req, res) => {
    const { name, contact, assignedOrders } = req.body;

    if (!name || !contact) {
        return res.status(400).json({ error: "Name and contact are required" });
    }

    try {
        const newDeliveryPersonnel = new DeliveryPersonnel({ name, contact, assignedOrders });
        await newDeliveryPersonnel.save();
        res.status(201).json({ message: "Delivery personnel added successfully", deliveryPersonnel: newDeliveryPersonnel });
    } catch (err) {
        res.status(500).json({ error: "Failed to add delivery personnel" });
    }
});

// Get all delivery personnel (with populated orders)
app.get("/api/delivery-personnel", async (req, res) => {
  try {
      const allDeliveryPersonnel = await DeliveryPersonnel.find().populate('assignedOrders');
      res.json(allDeliveryPersonnel);
  } catch (err) {
      res.status(500).json({ error: "Failed to fetch delivery personnel" });
  }
});

// Get a specific delivery personnel by ID (with populated orders)
app.get("/api/delivery-personnel/:id", async (req, res) => {
  try {
      const deliveryPersonnel = await DeliveryPersonnel.findById(req.params.id).populate('assignedOrders');
      if (!deliveryPersonnel) return res.status(404).json({ message: "Delivery personnel not found" });
      res.json(deliveryPersonnel);
  } catch (err) {
      res.status(500).json({ error: "Failed to fetch delivery personnel" });
  }
});


// assign a specific delivery personnel
app.put("/api/delivery-personnel/:id/assign", async (req, res) => {
  const { orderId } = req.body;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({error: "Order not found"});
    } 
      const deliveryPersonnel = await DeliveryPersonnel.findById(req.params.id);
      if (!deliveryPersonnel) {
          return res.status(404).json({ error: "Delivery personnel not found" });
      }
      // Optionally, check if orderId is valid or already assigned
      deliveryPersonnel.assignedOrders.push(orderId);
      await deliveryPersonnel.save();
      res.json({ message: "Order assigned successfully", deliveryPersonnel });
  } catch (err) {
      res.status(500).json({ error: "Failed to assign order" });
  }
});

// Update delivery personnel (e.g., assigning new orders or updating contact)
app.put("/api/delivery-personnel/:id", async (req, res) => {
  const { name, contact } = req.body; // Remove assignedOrders from here
  try {
      const updatedData = { name, contact };
      const deliveryPersonnel = await DeliveryPersonnel.findByIdAndUpdate(
          req.params.id,
          updatedData,
          { new: true }
      );
      if (!deliveryPersonnel) 
          return res.status(404).json({ message: "Delivery personnel not found" });
      res.json(deliveryPersonnel);
  } catch (err) {
      res.status(400).json({ error: "Failed to update delivery personnel" });
  }
});

// Delete a delivery personnel
app.delete("/api/delivery-personnel/:id", async (req, res) => {
    try {
        const deliveryPersonnel = await DeliveryPersonnel.findByIdAndDelete(req.params.id);
        if (!deliveryPersonnel) return res.status(404).json({ message: "Delivery personnel not found" });
        res.json({ message: "Delivery personnel deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete delivery personnel" });
    }
});
