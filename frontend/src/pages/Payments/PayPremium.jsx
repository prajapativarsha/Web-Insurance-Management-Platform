// frontend/src/pages/Payments/PayPremium.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { paymentApi } from '../../services/paymentApi.js';

const PayPremium = () => {
  const { policyId } = useParams();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [formData, setFormData] = useState({
    amount: '',
    payment_method: 'Credit Card',
    // transaction_ref: ''
  });

  // Fetch past payments on load
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await paymentApi.getPaymentHistory(policyId);
        setHistory(res.data);
      } catch (err) {
        console.error("Failed to fetch history");
      }
    };
    fetchHistory();
  }, [policyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await paymentApi.createPayment(policyId, {
        amount: parseFloat(formData.amount),
        payment_method: formData.payment_method
        // transaction_ref: formData.transaction_ref
      });
      alert('Payment submitted successfully!');
      navigate(`/policies/${policyId}/payments`); // Redirect after success
    } catch (err) {
      alert('Payment failed. Please check your inputs.');
    }
  };
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Pay Premium for Policy #{policyId}</h2>
      
      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="mb-10 space-y-4">
        <div>
          <label className="block text-gray-700">Amount ($)</label>
          <input 
            type="number" 
            required 
            className="w-full px-4 py-2 border rounded"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-gray-700">Payment Method</label>
          <select 
            className="w-full px-4 py-2 border rounded"
            value={formData.payment_method}
            onChange={(e) => setFormData({...formData, payment_method: e.target.value})}
          >
            <option value="Credit Card">Credit Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
      
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Submit Payment
        </button>
      </form>

    </div>
  );
};

export default PayPremium;