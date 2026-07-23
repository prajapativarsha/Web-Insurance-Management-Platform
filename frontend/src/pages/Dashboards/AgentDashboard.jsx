import React from 'react';
import Card from '../../components/ui/Card';
import { Link } from 'react-router-dom';

const AgentDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Agent Dashboard</h1>
      <p className="text-gray-600 mb-8">Manage your customer portfolio and daily tasks.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/customers/create">
          <Card className="hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Register Customer</h2>
            <p className="text-gray-500">Onboard a new customer to the platform.</p>
          </Card>
        </Link>

        <Link to="/claims/review">
          <Card className="hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Review Claims</h2>
            <p className="text-gray-500">Verify documents and approve/reject pending claims.</p>
          </Card>
        </Link>

        <Link to="/policies">
          <Card className="hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Active Policies</h2>
            <p className="text-gray-500">View and update existing insurance policies.</p>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default AgentDashboard;