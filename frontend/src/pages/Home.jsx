import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Discover Thailand</h1>
            <p className="text-xl mb-8">
              Experience unforgettable adventures with our curated travel packages
            </p>
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 bg-accent-500 text-white px-8 py-3 rounded-lg hover:bg-accent-600 transition text-lg font-semibold"
            >
              Explore Packages <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Thaigger?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">🌴</div>
              <h3 className="text-2xl font-bold mb-4">Curated Packages</h3>
              <p className="text-gray-600">
                Handpicked travel packages to the most beautiful destinations in Thailand
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-2xl font-bold mb-4">Best Prices</h3>
              <p className="text-gray-600">
                Competitive pricing with flexible payment options and special discounts
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4">Expert Support</h3>
              <p className="text-gray-600">
                24/7 customer support to ensure your travel experience is perfect
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="bg-gradient-to-r from-blue-400 to-blue-500 h-48 flex items-center justify-center">
                <span className="text-white text-4xl">🏙️</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Bangkok</h3>
                <p className="text-gray-600 mb-4">
                  Experience the vibrant capital with ancient temples and modern attractions
                </p>
                <Link to="/packages" className="text-primary-600 font-semibold hover:text-primary-700">
                  View Packages →
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-48 flex items-center justify-center">
                <span className="text-white text-4xl">🏖️</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Phuket</h3>
                <p className="text-gray-600 mb-4">
                  Pristine beaches, crystal-clear waters, and exciting island adventures
                </p>
                <Link to="/packages" className="text-primary-600 font-semibold hover:text-primary-700">
                  View Packages →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
