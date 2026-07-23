import React from 'react';
import Card from '../../components/ui/Card';
import { Link } from 'react-router-dom';

const CustomerDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">My Dashboard</h1>
      <p className="text-gray-600 mb-8">Manage your insurance policies and claims.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/customer/policies">
          <Card className="hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">My Policies</h2>
            <p className="text-gray-500">View policy details and download documents.</p>
          </Card>
        </Link>

        <Link to="/customer/payments">
          <Card className="hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Pay Premium</h2>
            <p className="text-gray-500">Track due dates and record premium payments.</p>
          </Card>
        </Link>

        <Link to="/customer/claims/submit">
          <Card className="hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Submit a Claim</h2>
            <p className="text-gray-500">Upload documents and track your claim status.</p>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default CustomerDashboard;