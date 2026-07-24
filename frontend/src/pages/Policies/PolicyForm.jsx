import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import policyApi from '../../services/policyApi';

const PolicyForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Form state matching our backend Zod schema
    const [formData, setFormData] = useState({
        customer_id: '',
        policy_type: 'Health', // Default value
        premium_amount: '',
        start_date: '',
        end_date: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Format data for the backend (convert strings to numbers/dates)
            const payload = {
                ...formData,
                customer_id: Number(formData.customer_id),
                premium_amount: Number(formData.premium_amount),
                // Ensure dates are in ISO-8601 format for Zod validation
                start_date: new Date(formData.start_date).toISOString(),
                end_date: new Date(formData.end_date).toISOString()
            };

            await policyApi.createPolicy(payload);
            
            // Redirect back to the policy list on success
            navigate('/policies');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create policy. Check your inputs.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-10">
            <h2 className="text-2xl font-bold mb-6">Create New Policy</h2>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {/* Handle both string errors and Zod array errors */}
                    {typeof error === 'string' ? error : JSON.stringify(error)}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Customer ID</label>
                    <input 
                        type="number" 
                        name="customer_id" 
                        value={formData.customer_id} 
                        onChange={handleChange} 
                        required 
                        className="w-full border border-gray-300 rounded px-4 py-2"
                        placeholder="e.g. 1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Policy Type</label>
                    <select 
                        name="policy_type" 
                        value={formData.policy_type} 
                        onChange={handleChange} 
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    >
                        <option value="Health">Health Insurance</option>
                        <option value="Life">Life Insurance</option>
                        <option value="Vehicle">Vehicle Insurance</option>
                        <option value="Home">Home Insurance</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Premium Amount ($)</label>
                    <input 
                        type="number" 
                        name="premium_amount" 
                        value={formData.premium_amount} 
                        onChange={handleChange} 
                        required 
                        min="1"
                        className="w-full border border-gray-300 rounded px-4 py-2"
                        placeholder="e.g. 500"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Start Date</label>
                        <input 
                            type="date" 
                            name="start_date" 
                            value={formData.start_date} 
                            onChange={handleChange} 
                            required 
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">End Date</label>
                        <input 
                            type="date" 
                            name="end_date" 
                            value={formData.end_date} 
                            onChange={handleChange} 
                            required 
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button 
                        type="button" 
                        onClick={() => navigate('/policies')}
                        className="mr-4 px-4 py-2 text-gray-600 hover:underline"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Policy'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PolicyForm;