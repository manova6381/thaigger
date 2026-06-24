import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { packagesAPI } from '../utils/api';
import { FiLoader } from 'react-icons/fi';

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setIsLoading(true);
      const response = await packagesAPI.getAll();
      setPackages(response.data);
    } catch (err) {
      setError('Failed to load packages');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FiLoader className="animate-spin text-4xl text-primary-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchPackages}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-12">Travel Packages</h1>

        {packages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No packages available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map(pkg => (
              <div
                key={pkg._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <div className="bg-gradient-to-r from-primary-500 to-accent-500 h-40 flex items-center justify-center">
                  <span className="text-white text-5xl">📍</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{pkg.description}</p>

                  <div className="space-y-2 text-sm mb-4">
                    <p>
                      <span className="font-semibold">Destination:</span> {pkg.destination}
                    </p>
                    <p>
                      <span className="font-semibold">Duration:</span> {pkg.duration}
                    </p>
                    <p>
                      <span className="font-semibold">Price:</span> ${pkg.price}
                    </p>
                  </div>

                  <Link
                    to={`/packages/${pkg._id}`}
                    className="block text-center bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
