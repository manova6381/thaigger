import React, { useState, useEffect } from 'react';
import { adminAPI, packagesAPI } from '../utils/api';
import toast from 'react-hot-toast';
import { FiLoader, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewPackageForm, setShowNewPackageForm] = useState(false);
  const [newPackage, setNewPackage] = useState({
    name: '',
    description: '',
    destination: '',
    price: '',
    duration: '',
    highlights: '',
    accommodation: '',
    meals: '',
  });

  useEffect(() => {
    if (activeTab === 'bookings') {
      fetchBookings();
    } else if (activeTab === 'packages') {
      fetchPackages();
    }
  }, [activeTab]);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const response = await adminAPI.getAllBookings();
      setBookings(response.data);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPackages = async () => {
    try {
      setIsLoading(true);
      const response = await packagesAPI.getAll();
      setPackages(response.data);
    } catch (error) {
      toast.error('Failed to load packages');
    } finally {
      setIsLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      await adminAPI.updateBookingStatus(bookingId, { status });
      toast.success('Booking status updated');
      fetchBookings();
    } catch (error) {
      toast.error('Failed to update booking');
    }
  };

  const handleCreatePackage = async (e) => {
    e.preventDefault();
    try {
      await adminAPI.createPackage({
        ...newPackage,
        price: parseFloat(newPackage.price),
        highlights: newPackage.highlights.split(',').map(h => h.trim()),
      });
      toast.success('Package created successfully');
      setShowNewPackageForm(false);
      setNewPackage({
        name: '',
        description: '',
        destination: '',
        price: '',
        duration: '',
        highlights: '',
        accommodation: '',
        meals: '',
      });
      fetchPackages();
    } catch (error) {
      toast.error('Failed to create package');
    }
  };

  const deletePackage = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await adminAPI.deletePackage(id);
        toast.success('Package deleted successfully');
        fetchPackages();
      } catch (error) {
        toast.error('Failed to delete package');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 font-semibold border-b-2 transition ${
              activeTab === 'bookings'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Bookings
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`px-4 py-2 font-semibold border-b-2 transition ${
              activeTab === 'packages'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Packages
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <FiLoader className="animate-spin text-4xl text-primary-600" />
          </div>
        ) : activeTab === 'bookings' ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">All Bookings</h2>
            {bookings.length === 0 ? (
              <p className="text-gray-600">No bookings yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">ID</th>
                      <th className="text-left py-3 px-4">Customer</th>
                      <th className="text-left py-3 px-4">Package</th>
                      <th className="text-left py-3 px-4">People</th>
                      <th className="text-left py-3 px-4">Total</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(booking => (
                      <tr key={booking.id} className="border-b hover:bg-light">
                        <td className="py-4 px-4">#{booking.id}</td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-semibold">{booking.firstName} {booking.lastName}</p>
                            <p className="text-sm text-gray-600">{booking.email}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">{booking.packageId}</td>
                        <td className="py-4 px-4">{booking.numberOfPeople}</td>
                        <td className="py-4 px-4 font-semibold">${booking.totalPrice}</td>
                        <td className="py-4 px-4">
                          <select
                            value={booking.status}
                            onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-sm font-semibold cursor-pointer ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-4 px-4">
                          <button className="text-blue-600 hover:text-blue-700">Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Travel Packages</h2>
              <button
                onClick={() => setShowNewPackageForm(!showNewPackageForm)}
                className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
              >
                <FiPlus /> New Package
              </button>
            </div>

            {showNewPackageForm && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Create New Package</h3>
                <form onSubmit={handleCreatePackage} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Package Name"
                    value={newPackage.name}
                    onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <textarea
                    placeholder="Description"
                    value={newPackage.description}
                    onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Destination"
                      value={newPackage.destination}
                      onChange={(e) => setNewPackage({ ...newPackage, destination: e.target.value })}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={newPackage.price}
                      onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Duration (e.g., 3 days)"
                      value={newPackage.duration}
                      onChange={(e) => setNewPackage({ ...newPackage, duration: e.target.value })}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Accommodation"
                      value={newPackage.accommodation}
                      onChange={(e) => setNewPackage({ ...newPackage, accommodation: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Meals (e.g., Breakfast & Dinner)"
                    value={newPackage.meals}
                    onChange={(e) => setNewPackage({ ...newPackage, meals: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <textarea
                    placeholder="Highlights (comma-separated)"
                    value={newPackage.highlights}
                    onChange={(e) => setNewPackage({ ...newPackage, highlights: e.target.value })}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
                    >
                      Create Package
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNewPackageForm(false)}
                      className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {packages.map(pkg => (
                <div key={pkg._id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{pkg.name}</h3>
                      <p className="text-gray-600 text-sm">{pkg.destination}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-700">
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => deletePackage(pkg._id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Price</p>
                      <p className="font-bold text-lg">${pkg.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-bold text-lg">{pkg.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
