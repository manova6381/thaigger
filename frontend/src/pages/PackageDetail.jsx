import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { packagesAPI, bookingsAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FiLoader } from 'react-icons/fi';

export default function PackageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pkg, setPkg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    numberOfPeople: 1,
    startDate: '',
    specialRequests: '',
  });
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    fetchPackage();
  }, [id]);

  const fetchPackage = async () => {
    try {
      setIsLoading(true);
      const response = await packagesAPI.getById(id);
      setPkg(response.data);
    } catch (error) {
      toast.error('Failed to load package');
      navigate('/packages');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login to book');
      navigate('/login');
      return;
    }

    setIsBooking(true);
    try {
      const totalPrice = pkg.price * bookingData.numberOfPeople;
      await bookingsAPI.create({
        packageId: id,
        numberOfPeople: bookingData.numberOfPeople,
        startDate: bookingData.startDate,
        totalPrice,
        specialRequests: bookingData.specialRequests,
      });

      toast.success('Booking created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Booking failed');
    } finally {
      setIsBooking(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FiLoader className="animate-spin text-4xl text-primary-600" />
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Package not found</p>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        <button
          onClick={() => navigate('/packages')}
          className="mb-6 text-primary-600 hover:text-primary-700 font-semibold"
        >
          ← Back to Packages
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">{pkg.name}</h1>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm opacity-90">Destination</p>
                <p className="text-2xl font-semibold">{pkg.destination}</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Duration</p>
                <p className="text-2xl font-semibold">{pkg.duration}</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Price per Person</p>
                <p className="text-3xl font-bold">${pkg.price}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Details */}
            <div className="md:col-span-2">
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">About This Package</h2>
                <p className="text-gray-600 leading-relaxed">{pkg.description}</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Highlights</h2>
                <ul className="space-y-2">
                  {pkg.highlights?.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-accent-500 font-bold">✓</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-gray-700">Accommodation</p>
                  <p className="text-gray-600">{pkg.accommodation}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Meals</p>
                  <p className="text-gray-600">{pkg.meals}</p>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-light p-6 rounded-lg h-fit">
              <h2 className="text-2xl font-bold mb-4">Book Now</h2>
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Number of People</label>
                  <input
                    type="number"
                    min="1"
                    value={bookingData.numberOfPeople}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        numberOfPeople: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Start Date</label>
                  <input
                    type="date"
                    value={bookingData.startDate}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        startDate: e.target.value,
                      })
                    }
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Special Requests</label>
                  <textarea
                    value={bookingData.specialRequests}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        specialRequests: e.target.value,
                      })
                    }
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Any special requirements?"
                  />
                </div>

                <div className="bg-white p-4 rounded border-t-2 border-accent-500">
                  <p className="text-sm text-gray-600">Total Price</p>
                  <p className="text-3xl font-bold text-accent-600">
                    ${pkg.price * bookingData.numberOfPeople}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isBooking}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition disabled:bg-gray-400 font-semibold"
                >
                  {isBooking ? 'Booking...' : 'Book Now'}
                </button>

                {!user && (
                  <p className="text-sm text-gray-600 text-center">
                    <button
                      type="button"
                      onClick={() => navigate('/login')}
                      className="text-primary-600 font-semibold hover:text-primary-700"
                    >
                      Login
                    </button>
                    {' '}to book this package
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
