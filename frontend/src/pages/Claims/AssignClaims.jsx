import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { claimApi } from '../../services/claimApi.js';

const AssignClaims = () => {
    const [claims, setClaims] = useState([]);

    const fetchClaims = async () => {
        try {
            // Fetch all claims. You could pass '?status=submitted' here to filter
            const response = await claimApi.getAllClaims();
            setClaims(response.data);
        } catch (error) {
            console.error("Failed to load claims", error);
        }
    };

    useEffect(() => {
        fetchClaims();
    }, []);

 
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Assign Customer Claims</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Claim #</th>
                            <th className="p-3 text-left">Customer ID</th>
                            <th className="p-3 text-left">Amount</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {claims.map((claim) => (
                            <tr key={claim.id} className="border-t">
                                <td className="p-3">{claim.claim_number}</td>
                                <td className="p-3">{claim.customer_id}</td>
                                <td className="p-3">${claim.claim_amount}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded text-sm ${claim.status === 'approved' ? 'bg-green-100 text-green-800' :
                                        claim.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {claim.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="p-3 flex gap-2">
                                    {claim.status === 'submitted' && (
                                        <Link to={`/admin/claim/${claim.id}/assign_claim`} className="text-sm bg-blue-500 text-white px-3 py-1 rounded">
                                            Assign
                                        </Link>
                                    )}

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignClaims;