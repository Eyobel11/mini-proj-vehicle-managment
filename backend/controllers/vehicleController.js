const Vehicle = require("../models/Vehicle");

// Add a new vehicle
const addVehicle = async (req, res) => {
  try {
    const { name, status } = req.body;
    const newVehicle = new Vehicle({ name, status });
    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update vehicle status
// const updateVehicleStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const updatedVehicle = await Vehicle.findByIdAndUpdate(
//       req.params.id,
//       { status, lastUpdated: Date.now() },
//       { new: true }
//     );
//     if (!updatedVehicle) {
//       return res.status(404).json({ message: "Vehicle not found" });
//     }
//     res.json(updatedVehicle);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// Fetch all vehicles
const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteVehicle = async (req, res) => {
    try {
      const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
      res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

const updateVehicle =  async (req, res) => {

  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      { status, lastUpdated: new Date() },
      { new: true }
    );

    if (!updatedVehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.json(updatedVehicle);
  } catch (error) {
    console.error('Error updating vehicle:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  addVehicle,
//   updateVehicleStatus,
  getAllVehicles,
  deleteVehicle,
  updateVehicle
};
