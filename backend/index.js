const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const vehicleRoutes = require("./routes/vehicelRoutes");

const app = express();
app.use(cors());

// app.use(cors({
//   origin: 'mini-proj-vehicle-managment-uzl2.vercel.app', // Frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// }));

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
