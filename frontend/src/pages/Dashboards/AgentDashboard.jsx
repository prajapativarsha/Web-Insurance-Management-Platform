import React from 'react';
import { Link } from 'react-router-dom';
import { Users, FileCheck, Shield } from 'lucide-react'; // Imported icons for visual appeal

const AgentDashboard = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-8">
      <div className="max-w-6xl mx-auto mt-4">
        
        {/* Header Section */}
        <div className="mb-10">
          <p className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2">
            Agent Panel
          </p>
          <h1 className="text-4xl font-extrabold text-[#0f2942]">
            Agent Dashboard
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Manage your customer portfolio and daily tasks.
          </p>
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <Link to="/customers">
            <div className="group h-full rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 cursor-pointer">
              <div className="flex flex-col gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-transform group-hover:scale-110">
                  <Users className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#0f2942] mb-2">Manage Customers</h2>
                  <p className="text-sm font-medium text-slate-500 leading-relaxed">Onboard a new customer to the platform.</p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/agent/claims">
            <div className="group h-full rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 cursor-pointer">
              <div className="flex flex-col gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition-transform group-hover:scale-110">
                  <FileCheck className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#0f2942] mb-2">Review Claims</h2>
                  <p className="text-sm font-medium text-slate-500 leading-relaxed">Verify documents and approve/reject pending claims.</p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/policies">
            <div className="group h-full rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 cursor-pointer">
              <div className="flex flex-col gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-transform group-hover:scale-110">
                  <Shield className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#0f2942] mb-2">Active Policies</h2>
                  <p className="text-sm font-medium text-slate-500 leading-relaxed">View and update existing insurance policies.</p>
                </div>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;