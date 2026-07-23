import React from 'react';
import { Link } from 'react-router-dom';

const CustomerTable = ({ customers, onDelete }) => {
    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="p-4 font-semibold text-gray-600">Name</th>
                        <th className="p-4 font-semibold text-gray-600">Email</th>
                        <th className="p-4 font-semibold text-gray-600">Phone</th>
                        <th className="p-4 font-semibold text-gray-600">KYC Status</th>
                        <th className="p-4 font-semibold text-gray-600">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="p-4 text-center text-gray-500">No customers found.</td>
                        </tr>
                    ) : (
                        customers.map((customer) => (
                            <tr key={customer.id} className="border-b hover:bg-gray-50">
                                <td className="p-4">{customer.users?.name}</td>
                                <td className="p-4">{customer.users?.email}</td>
                                <td className="p-4">{customer.users?.phone || 'N/A'}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-sm ${customer.kyc_status ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {customer.kyc_status ? 'Verified' : 'Pending'}
                                    </span>
                                </td>
                                <td className="p-4 flex gap-2">
                                    <Link to={`/customers/${customer.id}`} className="text-blue-500 hover:underline">View</Link>
                                    <Link to={`/customers/edit/${customer.id}`} className="text-orange-500 hover:underline">Edit</Link>
                                    <button onClick={() => onDelete(customer.id)} className="text-red-500 hover:underline">Deactivate</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerTable;