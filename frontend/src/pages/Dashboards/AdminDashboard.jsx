import React from 'react';
import Card from '../../components/ui/Card';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Administrator Dashboard</h1>
      <p className="text-gray-600 mb-8">Welcome back. Here is your system overview.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/customers">
          <Card className="hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Manage Customers</h2>
            <p className="text-gray-500">View, search, and edit all customer profiles.</p>
          </Card>
        </Link>
        
        <Link to="/policies/create">
          <Card className="hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Create Policy</h2>
            <p className="text-gray-500">Issue new insurance policies to registered users.</p>
          </Card>
        </Link>

        <Link to="/admin/reports">
          <Card className="hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">System Reports</h2>
            <p className="text-gray-500">View aggregated KPIs and system metrics.</p>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;