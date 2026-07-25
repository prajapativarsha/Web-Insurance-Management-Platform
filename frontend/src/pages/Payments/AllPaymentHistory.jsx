import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { paymentApi } from '../../services/paymentApi';


const CustomerPaymentHistory = () => {
  const { customerId } = useParams();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await paymentApi.getCustomerPaymentHistory(customerId);
        setPayments(res.data);
      } catch (err) {
        console.error("Failed to fetch payment history");
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
        <h2 className="text-2xl font-bold text-gray-800">Payment History </h2>
        {/* <Link
          to={`/policies/${policyId}/pay`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Make a Payment
        </Link> */}
      </div>
     
      {payments.length === 0 ? (
        <p className="text-gray-600 border p-4 rounded bg-gray-50">No payments have been made for this policy yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-left text-gray-600">Date</th>
                <th className="py-3 px-4 border-b text-left text-gray-600">Amount</th>
                <th className="py-3 px-4 border-b text-left text-gray-600">Payment Method</th>
                <th className="py-3 px-4 border-b text-left text-gray-600">Transaction Ref</th>
                <th className="py-3 px-4 border-b text-left text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{new Date(payment.payment_date).toLocaleDateString()}</td>
                  <td className="py-3 px-4 border-b font-medium">${payment.amount}</td>
                  <td className="py-3 px-4 border-b">{payment.payment_method}</td>
                  <td className="py-3 px-4 border-b text-sm text-gray-500">{payment.transaction_ref || '--'}</td>
                  <td className="py-3 px-4 border-b capitalize">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      payment.status === 'success' ? 'bg-green-100 text-green-800' :
                      payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {payment.status}
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


export default CustomerPaymentHistory;
