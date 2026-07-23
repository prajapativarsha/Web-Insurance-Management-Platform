import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import customerApi from '../../services/customerApi';
import CustomerTable from '../../components/ui/CustomerTable';
import CustomerSearch from '../../components/ui/CustomerSearch';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCustomers = async (searchQuery = '') => {
        try {
            setLoading(true);
            const response = await customerApi.getCustomers(searchQuery);
            setCustomers(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch customers.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to deactivate this customer?')) {
            try {
                await customerApi.deactivateCustomer(id);
                // Refresh the list after successful deletion
                fetchCustomers();
            } catch (err) {
                alert('Failed to deactivate customer.');
            }
        }
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Customer Management</h1>
                <Link to="/customers/create" className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700">
                    + Add New Customer
                </Link>
            </div>

            <CustomerSearch onSearch={fetchCustomers} />

            {loading ? (
                <p>Loading customers...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <CustomerTable customers={customers} onDelete={handleDelete} />
            )}
        </div>
    );
};

export default CustomerList;