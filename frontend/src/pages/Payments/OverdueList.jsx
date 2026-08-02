// frontend/src/pages/Payments/OverdueList.jsx
import React, { useState, useEffect } from 'react';
import { paymentApi } from '../../services/paymentApi.js';

const OverdueList = () => {
  const [overduePolicies, setOverduePolicies] = useState([]);

  useEffect(() => {
    const fetchOverdue = async () => {
      try {
        const res = await paymentApi.getOverduePremiums();
        setOverduePolicies(res.data);
      } catch (err) {
        console.error("Failed to fetch overdue policies");
      }
    };
    fetchOverdue();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-red-600">Action Required: Overdue Premiums</h2>
      
      {overduePolicies.length === 0 ? (
        <p className="text-gray-600">Great job! There are no overdue premiums at this time.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {overduePolicies.map((policy) => (
            <div key={policy.id} className="border-l-4 border-red-500 bg-white p-4 rounded shadow">
              <h3 className="font-bold text-lg">Policy #{policy.policy_number}</h3>
              <p className="text-gray-600">Customer: {policy.customers.first_name} {policy.customers.last_name}</p>
              <p className="text-gray-600">Email: {policy.customers.email}</p>
              <p className="text-gray-600">Phone: {policy.customers.phone_number}</p>
              <div className="mt-4 p-2 bg-red-50 text-red-700 rounded text-sm font-semibold">
                Next Due: {new Date(policy.next_due_date).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OverdueList;