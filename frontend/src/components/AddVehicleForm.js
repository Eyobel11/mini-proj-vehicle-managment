import React, { useState } from 'react';
import axios from '../axios';

const AddVehicleForm = ({ onVehicleAdded }) => {
  const [vehicleName, setVehicleName] = useState('');
  const [status, setStatus] = useState('Available');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/vehicles', {
        name: vehicleName,
        status: status,
        lastUpdated: new Date().toISOString(),
      });
      onVehicleAdded(response.data); // Update the table after adding
      setVehicleName('');
      setStatus('Available');
      alert('Vehicle added successfully!');
    } catch (error) {
      console.error('Error adding vehicle:', error);
      alert('Failed to add vehicle. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded">
      <h3 className="text-lg font-bold mb-4">Add New Vehicle</h3>
      <div className="mb-3">
        <label className="block text-sm font-medium">Vehicle Name</label>
        <input
          type="text"
          value={vehicleName}
          onChange={(e) => setVehicleName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="Available">Available</option>
          <option value="In Service">In Service</option>
          <option value="Out of Service">Out of Service</option>
        </select>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Vehicle
      </button>
    </form>
  );
};

export default AddVehicleForm;
