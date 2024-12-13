import React, { useEffect, useState } from 'react';
import API from '../axios'; // Import the axios instance
import Swal from 'sweetalert2';
import AddVehicleForm from './AddVehicleForm'; // Import the AddVehicleForm component

const VehicleTable = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch vehicles from the backend
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await API.get('/vehicles'); // Call the API endpoint
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  // Handle Delete Vehicle
  const handleDelete = async (vehicleId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });

      if (!result.isConfirmed) return;

      await API.delete(`/vehicles/${vehicleId}`); // API delete call
      setVehicles((prevVehicles) =>
        prevVehicles.filter((vehicle) => vehicle._id !== vehicleId)
      );

      Swal.fire({
        title: 'Deleted!',
        text: 'The vehicle has been deleted.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
      });
    } catch (error) {
      console.error('Error deleting vehicle:', error);

      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete the vehicle. Please try again.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    }
  };

  // Handle Update Vehicle Status
  const handleStatusUpdate = async (vehicleId, currentStatus) => {
    try {
      const { value: newStatus } = await Swal.fire({
        title: 'Update Vehicle Status',
        input: 'select',
        inputOptions: {
          Active: 'Active',
          Inactive: 'Inactive',
          Maintenance: 'Maintenance',
          Inservice: 'In Service',
          Outservice: 'Out of Service',
        },
        inputValue: currentStatus,
        showCancelButton: true,
        confirmButtonText: 'Update',
        cancelButtonText: 'Cancel',
        inputPlaceholder: 'Select a status',
      });

      if (!newStatus) return; // If the user cancels

      const response = await API.patch(`/vehicles/${vehicleId}`, { status: newStatus }); // API patch call

      // Update the local state with the updated vehicle
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) =>
          vehicle._id === vehicleId ? { ...vehicle, status: newStatus } : vehicle
        )
      );

      Swal.fire({
        title: 'Success!',
        text: `Vehicle status updated to ${newStatus}.`,
        icon: 'success',
        confirmButtonColor: '#3085d6',
      });
    } catch (error) {
      console.error('Error updating status:', error);

      Swal.fire({
        title: 'Error!',
        text: 'Failed to update the vehicle status. Please try again.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    }
  };

  // Handle new vehicle addition
  const handleVehicleAdded = (newVehicle) => {
    setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
  };

  if (loading) return <p>Loading vehicles...</p>;

  return (
    <div className="vehicle-table p-6">
      <h2 className="text-2xl font-semibold mb-4">Vehicle Management</h2>
      
      {/* Add Vehicle Form */}
      <div className="mb-6">
        <AddVehicleForm onVehicleAdded={handleVehicleAdded} />
      </div>

      {/* Vehicle Table */}
      <table className="min-w-full bg-white border border-gray-200 shadow-sm">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Vehicle Name</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Last Updated</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <tr key={vehicle._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{vehicle.name}</td>
                <td className="py-2 px-4 border-b">{vehicle.status}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(vehicle.lastUpdated).toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="text-blue-600 hover:text-blue-700 mr-4"
                    onClick={() => handleStatusUpdate(vehicle._id, vehicle.status)}
                  >
                    Update Status
                  </button>
                  <button
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(vehicle._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No vehicles found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleTable;
