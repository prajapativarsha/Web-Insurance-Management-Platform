import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { LogOut } from 'lucide-react'; // Added for the modern logout button

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();
  const role = user?.role?.toLowerCase() || 'customer';

  // Helper function to determine if a link is active for the blue underline effect
  const isActive = (path) => location.pathname.includes(path);

  return (
    // Updated to deep navy background matching your login screen
    <nav className="fixed top-0 z-50 w-full bg-[#0b1f38] px-4 py-3 shadow-md sm:px-6 lg:px-8">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex shrink-0 items-center gap-3">
          <img src="/favicon.svg" alt="InsureFlow Logo" className="h-10 w-10" />
          <Link to="/" className="text-xl font-bold tracking-tight text-white transition-colors hover:text-slate-200">
            InsureFlow
          </Link>
        </div>

        {/* Navigation & Logout */}
        {isAuthenticated && (
          <div className="flex items-center gap-6">
            
            <Link 
              to={`/${role}/dashboard`} 
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('dashboard') ? 'border-b-2 border-blue-500 pb-1 text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              Dashboard
            </Link>

            {role === 'admin' && (
              <Link 
                to="/employees" 
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive('/employees') ? 'border-b-2 border-blue-500 pb-1 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Employees
              </Link>
            )}

            {(role === 'admin' || role === 'agent') && (
              <Link 
                to="/customers" 
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive('/customers') ? 'border-b-2 border-blue-500 pb-1 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Customers
              </Link>
            )}
            
            <Link 
              to="/policies" 
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/policies') ? 'border-b-2 border-blue-500 pb-1 text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              Policies
            </Link>

            {(role === 'admin' || role === 'agent') && (
              <Link 
                to={`/${role}/claims`} // Fixed missing leading slash here
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive('/claims') ? 'border-b-2 border-blue-500 pb-1 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Claims
              </Link>
            )}

            {/* Modern Ghost Logout Button */}
            <button 
              onClick={logout} 
              className="group ml-2 flex items-center gap-2 rounded-lg border border-slate-600 bg-transparent px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:border-red-500 hover:bg-red-500 hover:text-white"
            >
              <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Logout
            </button>

          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;