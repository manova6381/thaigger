import React, { useState, useEffect } from 'react';
import { bookingsAPI, usersAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FiLoader } from 'react-icons/fi';

export default function Dashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(user);

  useEffect(() => {
    fetchBookings();
    fetchProfile();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingsAPI.getAll();
      setBookings(response.data);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await usersAPI.getProfile();
      setProfile(response.data);
    } catch (error) {
      console.error('Failed to load profile');
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FiLoader className="animate-spin text-4xl text-primary-600" />
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12">My Dashboard</h1>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold">{profile?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-semibold">
                {profile?.firstName} {profile?.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-semibold">{profile?.phone || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Role</p>
              <p className="font-semibold capitalize">{profile?.role}</p>
            </div>
          </div>
        </div>

        {/* Bookings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">My Bookings</h2>

          {bookings.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              <p>You have no bookings yet.</p>
              <a href="/packages" className="text-primary-600 font-semibold mt-2 inline-block">
                Browse packages →
              </a>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Booking ID</th>
                    <th className="text-left py-3 px-4">Package</th>
                    <th className="text-left py-3 px-4">People</th>
                    <th className="text-left py-3 px-4">Start Date</th>
                    <th className="text-left py-3 px-4">Total Price</th>
                    <th className="text-left py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(booking => (
                    <tr key={booking.id} className="border-b hover:bg-light transition">
                      <td className="py-4 px-4">#{booking.id}</td>
                      <td className="py-4 px-4">{booking.packageId}</td>
                      <td className="py-4 px-4">{booking.numberOfPeople}</td>
                      <td className="py-4 px-4">
                        {new Date(booking.startDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 font-semibold">${booking.totalPrice}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
