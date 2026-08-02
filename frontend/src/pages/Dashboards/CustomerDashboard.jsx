import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Shield, CreditCard, FileText, UserCheck } from 'lucide-react';

const CustomerDashboard = () => {
  const [customerId, setCustomerId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setCustomerId(decodedToken.customer_id); 
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8">
      <div className="max-w-6xl mx-auto mt-4">
        
        {/* Header Section */}
        <div className="mb-10">
          <p className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2">
            Customer Portal
          </p>
          <h1 className="text-4xl font-extrabold text-[#0f2942]">
            My Dashboard
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Manage your insurance policies and track your claims.
          </p>
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <Link to="/policies">
            <div className="group h-full rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 cursor-pointer">
              <div className="flex flex-col gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-transform group-hover:scale-110">
                  <Shield className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#0f2942] mb-2">My Policies</h2>
                  <p className="text-sm font-medium text-slate-500 leading-relaxed">View policy details and download documents.</p>
                </div>
              </div>
            </div>
          </Link>

          <Link to={`/payments/${customerId}`}>
            <div className="group h-full rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 cursor-pointer">
              <div className="flex flex-col gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-transform group-hover:scale-110">
                  <CreditCard className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#0f2942] mb-2">Payment History</h2>
                  <p className="text-sm font-medium text-slate-500 leading-relaxed">Track due dates and record premium payments.</p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/claims/my-claims">
            <div className="group h-full rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 cursor-pointer">
              <div className="flex flex-col gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition-transform group-hover:scale-110">
                  <FileText className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#0f2942] mb-2">My Claims</h2>
                  <p className="text-sm font-medium text-slate-500 leading-relaxed">Upload documents and track your claim status.</p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/customer/kyc-document-upload">
            <div className="group h-full rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 cursor-pointer">
              <div className="flex flex-col gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition-transform group-hover:scale-110">
                  <UserCheck className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#0f2942] mb-2">Complete KYC</h2>
                  <p className="text-sm font-medium text-slate-500 leading-relaxed">Securely upload your identity documents.</p>
                </div>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;