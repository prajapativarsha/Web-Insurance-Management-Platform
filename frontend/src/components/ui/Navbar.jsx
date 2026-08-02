import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();
  const role = user?.role?.toLowerCase() || 'customer';
  
  // State to manage mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper function for active links
  const isActive = (path) => location.pathname.includes(path);

  // Helper to close the mobile menu after clicking a link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-[#0b1f38] px-4 py-3 shadow-md sm:px-6 lg:px-8">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex shrink-0 items-center gap-3">
          <img src="/favicon.svg" alt="InsureFlow Logo" className="h-10 w-10" />
          <Link to="/" className="text-xl font-bold tracking-tight text-white transition-colors hover:text-slate-200">
            InsureFlow
          </Link>
        </div>

        {/* Desktop Navigation */}
        {isAuthenticated && (
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to={`/${role}/dashboard`} 
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('dashboard') ? 'text-blue-400 border-b-2 border-blue-400 pb-1' : 'text-slate-300 hover:text-white'
              }`}
            >
              Dashboard
            </Link>

            {role === 'admin' && (
              <Link 
                to="/employees" 
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive('/employees') ? 'text-blue-400 border-b-2 border-blue-400 pb-1' : 'text-slate-300 hover:text-white'
                }`}
              >
                Employees
              </Link>
            )}

            {(role === 'admin' || role === 'agent') && (
              <Link 
                to="/customers" 
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive('/customers') ? 'text-blue-400 border-b-2 border-blue-400 pb-1' : 'text-slate-300 hover:text-white'
                }`}
              >
                Customers
              </Link>
            )}
            
            <Link 
              to="/policies" 
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/policies') ? 'text-blue-400 border-b-2 border-blue-400 pb-1' : 'text-slate-300 hover:text-white'
              }`}
            >
              Policies
            </Link>

            {(role === 'admin' || role === 'agent') && (
              <Link 
                to={`/${role}/claims`}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive('/claims') ? 'text-blue-400 border-b-2 border-blue-400 pb-1' : 'text-slate-300 hover:text-white'
                }`}
              >
                Claims
              </Link>
            )}

            <button 
              onClick={logout} 
              className="group ml-2 flex items-center gap-2 rounded-lg border border-slate-600 bg-transparent px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:border-red-500 hover:bg-red-500 hover:text-white"
            >
              <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Logout
            </button>
          </div>
        )}

        {/* Mobile Menu Toggle Button */}
        {isAuthenticated && (
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-300 hover:text-white focus:outline-none p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Navigation Dropdown */}
      {isAuthenticated && isMobileMenuOpen && (
        <div className="md:hidden mt-3 space-y-1 border-t border-slate-700 px-2 pb-4 pt-3">
          <Link 
            to={`/${role}/dashboard`} 
            onClick={handleLinkClick}
            className={`block rounded-md px-3 py-2 text-base font-medium ${
              isActive('dashboard') ? 'bg-slate-800 text-blue-400' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            Dashboard
          </Link>

          {role === 'admin' && (
            <Link 
              to="/employees" 
              onClick={handleLinkClick}
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                isActive('/employees') ? 'bg-slate-800 text-blue-400' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              Employees
            </Link>
          )}

          {(role === 'admin' || role === 'agent') && (
            <Link 
              to="/customers" 
              onClick={handleLinkClick}
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                isActive('/customers') ? 'bg-slate-800 text-blue-400' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              Customers
            </Link>
          )}

          <Link 
            to="/policies" 
            onClick={handleLinkClick}
            className={`block rounded-md px-3 py-2 text-base font-medium ${
              isActive('/policies') ? 'bg-slate-800 text-blue-400' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            Policies
          </Link>

          {(role === 'admin' || role === 'agent') && (
            <Link 
              to={`/${role}/claims`} 
              onClick={handleLinkClick}
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                isActive('/claims') ? 'bg-slate-800 text-blue-400' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              Claims
            </Link>
          )}

          <button 
            onClick={() => { logout(); handleLinkClick(); }} 
            className="mt-4 flex w-full items-center gap-2 rounded-md bg-slate-800 px-3 py-2 text-base font-medium text-red-400 hover:bg-red-500 hover:text-white transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;