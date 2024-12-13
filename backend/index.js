const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const vehicleRoutes = require("./routes/vehicelRoutes");

const app = express();

const allowedOrigins =  "https://mini-proj-vehicle-managment-uzl2.vercel.app" // Frontend URL on Vercel
 


// Use CORS middleware with custom options
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      // Allow the origin
      callback(null, true);
    } else {
      // Deny the origin if not in the allowed list
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  // Allow cookies if needed
}));

// Add a catch-all middleware to ensure headers are sent properly in Vercel
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://mini-proj-vehicle-managment-uzl2.vercel.app"); // Allow any origin or specify your frontend URL
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow specific methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow necessary headers
  next();
});


app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// API Routes
app.use("/api/vehicles", vehicleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
