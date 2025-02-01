const farmers = [
    {
      id: "1",
      name: "Amit Kumar",
      location: "Punjab, India",
      crops: ["Wheat", "Rice"],
      rating: 4.5,
    },
    {
      id: "2",
      name: "Sunita Sharma",
      location: "Maharashtra, India",
      crops: ["Tomatoes", "Onions"],
      rating: 4.8,
    },
  ];
  
  const users = [
    {
      id: "1",
      name: "Rahul Verma",
      location: "Delhi, India",
      orders: [
        { crop: "Wheat", quantity: "100kg", status: "Delivered" },
        { crop: "Tomatoes", quantity: "50kg", status: "Pending" },
      ],
    },
  ];
  
  module.exports = { farmers, users };
  