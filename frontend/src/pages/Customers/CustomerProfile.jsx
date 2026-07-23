import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import customerApi from '../../services/customerApi';
import CustomerCard from '../../components/ui/CustomerCard';

const CustomerProfile = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await customerApi.getCustomerById(id);
                setCustomer(response.data);
            } catch (err) {
                console.error("Failed to fetch customer profile", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [id]);

    if (loading) return <div className="p-6">Loading profile...</div>;
    if (!customer) return <div className="p-6 text-red-500">Customer not found.</div>;

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">{customer.users?.name}'s Profile</h1>
                <Link to={`/customers/edit/${customer.id}`} className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    Edit Profile
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <CustomerCard title="Email" value={customer.users?.email} />
                <CustomerCard title="Phone" value={customer.users?.phone || 'N/A'} />
                <CustomerCard 
                    title="KYC Status" 
                    value={customer.kyc_status ? 'Verified' : 'Pending'} 
                />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-lg font-semibold mb-4">Personal Details</h2>
                <div className="grid grid-cols-2 gap-4">
                    <p><span className="font-medium text-gray-600">DOB:</span> {customer.date_of_birth || 'N/A'}</p>
                    <p><span className="font-medium text-gray-600">Address:</span> {customer.address || 'N/A'}</p>
                    <p><span className="font-medium text-gray-600">ID Type:</span> {customer.id_document_type || 'N/A'}</p>
                    <p><span className="font-medium text-gray-600">ID Number:</span> {customer.id_document_number || 'N/A'}</p>
                </div>
            </div>

            {/* In future days, you will render Policies, Claims, and Payments tables here using customer.policies, etc. */}
        </div>
    );
};

export default CustomerProfile;