import React, { useState , useEffect } from 'react';
import { claimApi } from '../../services/claimApi';
import { useNavigate , useParams } from 'react-router-dom';

const SubmitClaim = () => {
  const { id } = useParams(); 
  const policy_id = id;
  const navigate = useNavigate();
  const [formData, setFormData] = useState( {policy_id : policy_id || '', description: '', claim_amount: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      policy_id: policy_id || ''
    }));
  }, [policy_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert inputs to numbers where required by your Zod schema
      const payload = {
        policy_id: parseInt(formData.policy_id,10),
        description: formData.description,
        claim_amount: parseFloat(formData.claim_amount)
      };
      
      await claimApi.submitClaim(payload, policy_id);
      setMessage("Claim submitted successfully!");
      
      // Redirect back to dashboard after 2 seconds
      setTimeout(() => navigate('/customer/dashboard'), 2000);
    } catch (error) {
      setMessage("Error submitting claim. Please check your inputs.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">File a New Claim</h2>
      {message && <p className="mb-4 text-blue-600 font-semibold">{message}</p>}
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Policy ID</label>
          <input 
            type="number" 
            required
            readOnly
            className="w-full border p-2 rounded bg-gray-100 text-gray-600 cursor-not-allowed focus:outline-none"
            value={formData.policy_id}
            // onChange={(e) => setFormData({...formData, policy_id: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Claim Amount ($)</label>
          <input 
            type="number" 
            step="0.01"
            required
            className="w-full border p-2 rounded"
            value={formData.claim_amount}
            onChange={(e) => setFormData({...formData, claim_amount: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description of Incident</label>
          <textarea 
            required
            minLength="10"
            className="w-full border p-2 rounded h-24"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Submit Claim
        </button>
      </form>
    </div>
  );
};

export default SubmitClaim;