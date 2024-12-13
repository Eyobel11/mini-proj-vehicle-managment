const express = require('express');
const router = express.Router();
const { addVehicle, updateVehicleStatus, getAllVehicles, deleteVehicle,updateVehicle } = require('../controllers/vehicleController');

// Fetch all vehicles
router.get('/', getAllVehicles);

// Add a new vehicle
router.post('/', addVehicle);

// Update vehicle status
// router.put('/:id', updateVehicleStatus);

// Delete a vehicle
router.delete('/:id', deleteVehicle);

// Example: Updating vehicle status in Express.js
router.patch('/:id', updateVehicle);
  

module.exports = router;
