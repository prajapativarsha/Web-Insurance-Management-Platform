import React,{ useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';


const Navbar = () => {
  const { isAuthenticated ,logout, user} = useAuth();
  const role = user?.role?.toLowerCase() || 'customer';
  
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 w-full fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-primary tracking-tight">
              Insurance Management System
            </Link>
            </div>
            {isAuthenticated &&
            <div className="space-x-4">
              {/* Existing Links */}
               <Link to={`/${role}/dashboard`} className="hover:underline">Dashboard</Link>
              { (role ==='admin' ) && <Link to="/employees" className="hover:underline">Employees</Link>}
              { (role ==='admin'|| role ==='agent' ) && <Link to="/customers" className="hover:underline">Customers</Link>}
             
              {/* NEW: Policy Module Link */}
              <Link to="/policies" className="hover:underline">Policies</Link>
               {(role === 'admin' || role === 'agent') && (
                <Link to={`${role}/claims`} className="hover:underline">Claims</Link>
              )}

              <button onClick={logout} className="bg-red-500 px-3 py-1 rounded text-white">Logout</button>
            </div>}
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;