import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import policyApi from '../../services/policyApi.js';
import { useAuth } from '../../context/AuthContext.jsx';

// Import your UI components if you have them (e.g., Button, Card). 
// Using standard HTML elements here for simplicity.

const PolicyList = () => {
    const { user} = useAuth();
    const role = user?.role?.toLowerCase() || 'customer';
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter and Search State
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const fetchPolicies = async () => {
        setLoading(true);
        setError(null);
        try {
            // Pass search and status to the backend query
            const response = await policyApi.getPolicies({
                search: searchTerm,
                status: statusFilter
            });
            
            // Assuming your backend returns data inside a 'data.policies' object based on our controller setup
            setPolicies(response.data.policies || []);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch policies');
        } finally {
            setLoading(false);
        }
    };

    // Fetch data on initial load and whenever filters change
    useEffect(() => {
        // Adding a slight delay (debounce) here is best practice for search, 
        // but for now, we will just fetch when the user hits 'Enter' or clicks a button
        fetchPolicies();
    }, [statusFilter]); // Auto-fetch when status filter changes

    const handleSearch = (e) => {
        e.preventDefault();
        fetchPolicies();
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Policy Management</h1>
               { (role ==='admin'|| role ==='agent' ) && <Link to="/policies/new" className="bg-blue-600 text-white px-4 py-2 rounded shadow">
                    + Create Policy
                </Link>}
            </div>

            {/* Filters and Search Bar */}
            <div className="bg-white p-4 rounded shadow mb-6 flex gap-4">
                <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                    <input 
                        type="text" 
                        placeholder="Search by Policy Number or Customer ID..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                    <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded">
                        Search
                    </button>
                </form>

                <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2"
                >
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="EXPIRED">Expired</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            {/* Policy Table */}
            <div className="bg-white rounded shadow overflow-x-auto">
                {error && <div className="p-4 text-red-600 bg-red-50">{error}</div>}
                
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading policies...</div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="p-4">Policy Number</th>
                               {(role ==='agent' || role ==='admin') && (<th className="p-4">Customer</th>)} 
                                <th className="p-4">Type</th>
                                <th className="p-4">Premium</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">End Date</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {policies.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="p-4 text-center text-gray-500">No policies found.</td>
                                </tr>
                            ) : (
                                policies.map(policy => (
                                    <tr key={policy.id} className="border-b hover:bg-gray-50">
                                        <td className="p-4 font-medium">{policy.policy_number}</td>
                                        {/* Assuming your backend included the customer relation */}
                                    {(role ==='agent' || role ==='admin') && (<td className="p-4">{policy.customers?.name || `ID: ${policy.customer_id}`}</td>)}
                                        <td className="p-4">{policy.policy_type}</td>
                                        <td className="p-4">${policy.premium_amount}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-sm ${
                                                policy.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 
                                                policy.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {policy.status}
                                            </span>
                                        </td>
                                        <td className="p-4">{new Date(policy.end_date).toLocaleDateString()}</td>
                                        <td className="p-4">
                                            <Link to={`/policies/${policy.id}`} className="text-blue-600 hover:underline mr-3">View</Link>
                                            <Link to={`/policies/edit/${policy.id}`} className="text-blue-600 hover:underline mr-3">Edit</Link>
                                            <Link to={`/policies/${policy.id}/payments`} className="text-blue-600 hover:underline mr-3">Payments</Link>
                                            <Link to={`/claims/my-claims/${policy.id}`} className="text-blue-600 hover:underline mr-3">Claims</Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default PolicyList;