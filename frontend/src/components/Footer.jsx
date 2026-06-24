import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Thaigger</h3>
            <p className="text-gray-300 text-sm">
              Discover the beauty of Thailand with our curated travel packages and unforgettable experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/packages" className="hover:text-white transition">
                  Packages
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/#" className="hover:text-white transition">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/#" className="hover:text-white transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/#" className="hover:text-white transition">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="/#" className="hover:text-accent-500 transition">
                <FiFacebook size={24} />
              </a>
              <a href="/#" className="hover:text-accent-500 transition">
                <FiTwitter size={24} />
              </a>
              <a href="/#" className="hover:text-accent-500 transition">
                <FiInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <hr className="border-gray-700" />

        {/* Bottom */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2024 Thaigger. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="/#" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="/#" className="hover:text-white transition">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
