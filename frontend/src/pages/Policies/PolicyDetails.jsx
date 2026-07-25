import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


// 1. IMPORT THE DEFAULT OBJECT
import policyApi from '../../services/policyApi';


const PolicyDetails = () => {
  const { id } = useParams(); // Gets the policy ID from the URL
  const navigate = useNavigate();
 
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchPolicyDetails = async () => {
      try {
        setLoading(true);
        setError(null);
       
        // 2. CALL THE METHOD ON THE API OBJECT
        const response = await policyApi.getPolicyById(id);
       
        // Since your api code returns `response.data`, the policy is likely just `response`
        setPolicy(response.data);


      } catch (err) {
        console.error("Error fetching policy details:", err);
        setError("Failed to load policy details.");
      } finally {
        setLoading(false);
      }
    };


    if (id) {
      fetchPolicyDetails();
    }
  }, [id]);


  const handleBack = () => {
    navigate(-1); // Navigates back to the previous page
  };


  if (loading) return <div className="mt-10 text-center">Loading policy details...</div>;
  if (error) return <div className="mt-10 text-center text-red-600">{error}</div>;
  if (!policy) return <div className="mt-10 text-center">Policy not found.</div>;


  return (
    <div className="max-w-5xl mx-auto mt-6">
      {/* Top Navigation & Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={handleBack}
            className="text-blue-600 hover:underline mb-2 inline-block font-medium text-sm"
          >
            &larr; Back to Policies
          </button>
          <h2 className="text-2xl font-bold text-gray-800">
            Policy: {policy.policy_number}
          </h2>
        </div>
        <span className={`px-4 py-2 rounded-full text-sm font-bold capitalize ${
          policy.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {policy.status}
        </span>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Details Card */}
        <div className="border rounded-lg shadow-sm bg-white p-6">
          <h3 className="text-lg font-semibold border-b pb-2 mb-4">Coverage Details</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500 block">Policy Type</span>
                <span className="font-medium text-gray-800 capitalize">{policy.policy_type}</span>
              </div>
              <div>
                <span className="text-sm text-gray-500 block">Coverage Amount</span>
                <span className="font-medium text-gray-800">
                  ${Number(policy.coverage_amount).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500 block">Start Date</span>
                <span className="font-medium text-gray-800">
                  {new Date(policy.start_date).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500 block">End Date</span>
                <span className="font-medium text-gray-800">
                  {new Date(policy.end_date).toLocaleDateString()}
                </span>
              </div>
            </div>
            {policy.agents && (
              <div className="pt-2">
                <span className="text-sm text-gray-500 block">Assigned Agent</span>
                <span className="font-medium text-gray-800">
                  Agent ID: {policy.agent_id}
                </span>
              </div>
            )}
          </div>
        </div>


        {/* Premium & Billing Card */}
        <div className="border rounded-lg shadow-sm bg-white p-6">
          <h3 className="text-lg font-semibold border-b pb-2 mb-4">Billing Information</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500 block">Premium Amount</span>
                <span className="font-medium text-gray-800">
                  ${Number(policy.premium_amount).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500 block">Frequency</span>
                <span className="font-medium text-gray-800 capitalize">
                  {policy.premium_frequency}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500 block">Next Due Date</span>
                <span className={`font-medium ${
                  new Date(policy.next_due_date) < new Date() ? 'text-red-600 font-bold' : 'text-gray-800'
                }`}>
                  {policy.next_due_date ? new Date(policy.next_due_date).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500 block">Last Updated</span>
                <span className="font-medium text-gray-800">
                  {new Date(policy.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Relations: Payments & Claims */}
      <div className="mt-8 border rounded-lg shadow-sm bg-white p-6">
        <h3 className="text-lg font-semibold border-b pb-2 mb-4">Recent Payments</h3>
        {policy.payments && policy.payments.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-sm text-gray-500 border-b">
                <th className="pb-2 font-normal">Payment ID</th>
                <th className="pb-2 font-normal">Date</th>
                <th className="pb-2 font-normal">Amount</th>
                <th className="pb-2 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {policy.payments.map(payment => (
                <tr key={payment.id} className="border-b last:border-0">
                  <td className="py-3 font-medium">#{payment.id}</td>
                  <td className="py-3">{new Date(payment.date).toLocaleDateString()}</td>
                  <td className="py-3">${Number(payment.amount).toLocaleString()}</td>
                  <td className="py-3 capitalize">{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-sm text-gray-500">No payment history found for this policy.</p>
        )}
      </div>


      <div className="mt-8 border rounded-lg shadow-sm bg-white p-6 mb-10">
        <h3 className="text-lg font-semibold border-b pb-2 mb-4">Claims History</h3>
        {policy.claims && policy.claims.length > 0 ? (
          <div className="space-y-3">
             {policy.claims.map(claim => (
                <div key={claim.id} className="p-4 border rounded bg-gray-50 flex justify-between items-center">
                  <div>
                    <span className="block font-medium">Claim #{claim.id}</span>
                    <span className="text-sm text-gray-500">Filed: {new Date(claim.created_at).toLocaleDateString()}</span>
                  </div>
                  <span className="px-3 py-1 rounded bg-blue-100 text-blue-700 text-sm capitalize">
                    {claim.status}
                  </span>
                </div>
             ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No claims have been filed against this policy.</p>
        )}
      </div>
    </div>
  );
};


export default PolicyDetails;
