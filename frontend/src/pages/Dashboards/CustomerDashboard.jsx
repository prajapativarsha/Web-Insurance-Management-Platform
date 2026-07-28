import React, { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const CustomerDashboard = () => {
  const [customerId, setCustomerId] = useState(null);

    useEffect(() => {
      // 1. Retrieve the token from storage (update 'token' if you used a different key)
      const token = localStorage.getItem('token');

      if (token) {
        try {
          // 2. Decode the token to access its payload
          const decodedToken = jwtDecode(token);
          
          // 3. Extract the customer_id (ensure the key matches your backend token structure)
          setCustomerId(decodedToken.customer_id); 
        } catch (error) {
          console.error("Failed to decode token:", error);
        }
      }
    }, []);
  return (
    
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">My Dashboard</h1>
      <p className="text-gray-600 mb-8">Manage your insurance policies and claims.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/policies">
          <Card className="hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">My Policies</h2>
            <p className="text-gray-500">View policy details and download documents.</p>
          </Card>
        </Link>

        <Link to={`/payments/${customerId}`}>
          <Card className="hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">My Payment History</h2>
            <p className="text-gray-500">Track due dates and record premium payments.</p>
          </Card>
        </Link>

        <Link to="/claims/my-claims">
          <Card className="hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">My Claims</h2>
            <p className="text-gray-500">Upload documents and track your claim status.</p>
          </Card>
        </Link>

        <Link to="/customer/kyc-document-upload">
          <Card className="hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Complete KYC</h2>
            <p className="text-gray-500">Securely upload your identity documents for verification.</p>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default CustomerDashboard;