import React from 'react';
import { Link } from 'react-scroll';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Logo and Description */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <Link to="/" className="text-2xl font-bold text-white">Budget Buddy</Link>
            <p className="mt-4 text-gray-400 pr-6">
              Your go-to app for managing finances effectively and efficiently. Keep track of your income, expenses, and budgets all in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 cursor-pointer">
              <li><Link to="pricing" smooth={true} duration={500} className="text-gray-400 hover:text-white transition-colors duration-200">Pricing</Link></li>
              <li><Link to="features" smooth={true} duration={500} className="text-gray-400 hover:text-white transition-colors duration-200">Features</Link></li>
              <li><Link to="how-it-works" smooth={true} duration={500} className="text-gray-400 hover:text-white transition-colors duration-200">How it works</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-200">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Email: support@budgetbuddy.com</li>
              <li className="text-gray-400">Phone: (123) 456-7890</li>
              <li className="text-gray-400">Address: 123 Finance St, Budget City, BU 12345</li>
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 border-t border-gray-700 pt-8 flex justify-center space-x-6">
          <Link to="https://facebook.com" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="Facebook">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.675 0h-21.35C1.185 0 0 1.185 0 2.675v18.651C0 22.815 1.185 24 2.675 24h10.662v-9.294H9.691v-3.622h3.646V8.414c0-3.622 2.22-5.594 5.462-5.594 1.553 0 2.886.115 3.274.167v3.794h-2.248c-1.765 0-2.107.839-2.107 2.072v2.72h4.218l-.55 3.622h-3.668V24h7.198c1.49 0 2.675-1.185 2.675-2.674V2.675C24 1.185 22.815 0 21.325 0z" /></svg>
          </Link>
          <Link to="https://twitter.com" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="Twitter">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.952-2.178-1.549-3.594-1.549-2.723 0-4.927 2.204-4.927 4.927 0 .39.045.765.13 1.124-4.09-.205-7.719-2.166-10.148-5.144-.423.724-.666 1.562-.666 2.457 0 1.694.861 3.188 2.166 4.066-.801-.026-1.555-.246-2.212-.616v.061c0 2.367 1.685 4.342 3.918 4.792-.411.111-.845.171-1.292.171-.316 0-.624-.03-.924-.086.631 1.951 2.445 3.374 4.604 3.414-1.68 1.319-3.809 2.105-6.114 2.105-.398 0-.79-.023-1.175-.068 2.182 1.399 4.768 2.212 7.548 2.212 9.051 0 14.004-7.496 14.004-13.986 0-.213 0-.425-.015-.637.962-.695 1.797-1.56 2.457-2.548l-.047-.02z" /></svg>
          </Link>
          <Link to="https://instagram.com" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="Instagram">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.332 3.608 1.308.975.975 1.246 2.243 1.308 3.608.058 1.265.069 1.645.069 4.849s-.012 3.584-.07 4.849c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.243 1.246-3.608 1.308-1.265.058-1.645.069-4.849.069s-3.584-.012-4.849-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.246-2.243-1.308-3.608-.058-1.265-.069-1.645-.069-4.849s.012-3.584.07-4.849c.062-1.366.332-2.633 1.308-3.608.975-.975 2.243-1.246 3.608-1.308 1.265-.058 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.67.012-4.947.07-1.495.068-2.827.33-3.878 1.382-1.051 1.051-1.313 2.383-1.382 3.878-.058 1.277-.07 1.688-.07 4.947s.012 3.67.07 4.947c.068 1.495.33 2.827 1.382 3.878 1.051 1.051 2.383 1.313 3.878 1.382 1.277.058 1.688.07 4.947.07s3.67-.012 4.947-.07c1.495-.068 2.827-.33 3.878-1.382 1.051-1.051 1.313-2.383 1.382-3.878.058-1.277.07-1.688.07-4.947s-.012-3.67-.07-4.947c-.068-1.495-.33-2.827-1.382-3.878-1.051-1.051-2.383-1.313-3.878-1.382-1.277-.058-1.688-.07-4.947-.07zm0 5.838c-3.396 0-6.162 2.766-6.162 6.162s2.766 6.162 6.162 6.162 6.162-2.766 6.162-6.162-2.766-6.162-6.162-6.162zm0 10.163c-2.207 0-4-1.793-4-4s1.793-4 4-4 4 1.793 4 4-1.793 4-4 4zm6.406-11.845c-.796 0-1.441-.645-1.441-1.441 0-.796.645-1.441 1.441-1.441.796 0 1.441.645 1.441 1.441 0 .796-.645 1.441-1.441 1.441z" /></svg>
          </Link>
          <Link to="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="LinkedIn">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.23 0H1.77C.792 0 0 .774 0 1.725v20.551C0 23.227.792 24 1.77 24h20.459C23.208 24 24 23.227 24 22.276V1.725C24 .774 23.208 0 22.23 0zM7.09 20.452H3.558V9.017H7.09v11.435zm-1.766-12.9c-1.06 0-1.92-.855-1.92-1.911 0-1.057.86-1.911 1.92-1.911s1.92.855 1.92 1.911c0 1.057-.86 1.911-1.92 1.911zm14.142 12.9h-3.534v-5.614c0-1.336-.024-3.057-1.863-3.057-1.863 0-2.15 1.454-2.15 2.96v5.711H9.975V9.017h3.396v1.561h.047c.473-.896 1.63-1.837 3.354-1.837 3.587 0 4.251 2.36 4.251 5.433v6.278z" /></svg>
          </Link>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center text-gray-500">
          &copy; {new Date().getFullYear()} BudgetBuddy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
