import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { claimApi } from '../../services/claimApi.js';
import { jwtDecode } from 'jwt-decode';



const MyClaims = () => {

    
//   const { customerId } = useParams();
  const [customerId, setCustomerId] = useState(null);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Retrieve the token from storage (update 'token' if you used a different key)
        const token = localStorage.getItem('token');
  
        if (token) {
          try {
            // 2. Decode the token to access its payload
            const decodedToken = jwtDecode(token);
            
            // 3. Extract the customer_id (ensure the key matches your backend token structure)
            setCustomerId(decodedToken.customer_id); 
          } catch (error) {
            console.error("Failed to decode token:", error);
          }
        }
    const fetchHistory = async () => {
      try {
        const res = await claimApi.getMyClaims(customerId);
        setClaims(res.data);
      } catch (err) {
        console.error("Failed to fetch claims history");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [customerId]);


  if (loading) return <div className="p-6 text-center">Loading history...</div>;


  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Claims</h2>
      </div>
     
      {claims.length === 0 ? (
        <p className="text-gray-600 border p-4 rounded bg-gray-50">No claims have been made by you.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-left text-gray-600">Claim no.</th>
                <th className="py-3 px-4 border-b text-left text-gray-600">Claim Amount</th>
                <th className="py-3 px-4 border-b text-left text-gray-600">Submitted At</th>
                <th className="py-3 px-4 border-b text-left text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
                <tr key={claim.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{claim.claim_number}</td>
                  <td className="py-3 px-4 border-b font-medium">${claim.claim_amount}</td>
                  <td className="py-3 px-4 border-b">{new Date(claim.submitted_date).toLocaleDateString()}</td>
                  <td className="py-3 px-4 border-b capitalize">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      claim.status === 'success' ? 'bg-green-100 text-green-800' :
                      claim.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {claim.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};


export default MyClaims;
