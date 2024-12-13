const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const vehicleRoutes = require("./routes/vehicelRoutes");

const app = express();

const allowedOrigins =  "https://mini-proj-vehicle-managment-uzl2.vercel.app"; // Frontend URL on Vercel

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
