import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-1">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-3">About Us</h3>
            <ul>
              <li><a href="#" className="hover:text-blue-400">Our Story</a></li>
              <li><a href="#" className="hover:text-blue-400">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400">Blog</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <ul>
              <li><a href="mailto:contact@myfinance.com" className="hover:text-blue-400">Email Us</a></li>
              <li><a href="tel:+1234567890" className="hover:text-blue-400">Call Us</a></li>
            </ul>
          </div>

          {/* Privacy */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Privacy</h3>
            <ul>
              <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-blue-400">Facebook</a></li>
              <li><a href="#" className="hover:text-blue-400">Twitter</a></li>
              <li><a href="#" className="hover:text-blue-400">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2025 MyFinance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
