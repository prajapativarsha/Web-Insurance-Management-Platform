import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, DollarSign, AlertTriangle } from 'lucide-react';
import {
  Chart,
  BarController,
  DoughnutController,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { fetchDashboardSummary, fetchPolicySales, fetchClaimsStats } from '../../services/reportApi.js';

Chart.register(
  BarController,
  DoughnutController,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const STATUS_COLORS = {
  submitted: '#f59e0b',
  pending: '#f59e0b',
  approved: '#10b981',
  rejected: '#f43f5e',
  closed: '#64748b',
};

// MODIFIED: Removed hard borders, added soft shadow, rounded-2xl, and hover lift effect
const KpiCard = ({ icon: Icon, iconClass, value, label }) => (
  <div className="rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 cursor-pointer">
    <div className="flex items-center gap-5">
      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${iconClass}`}>
        <Icon className="h-7 w-7" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <h2 className="text-3xl font-extrabold text-[#0f2942] tabular-nums mt-1">{value}</h2>
      </div>
    </div>
  </div>
);

function useBarChart(canvasRef, salesData) {
  const chartRef = useRef(null);
  useEffect(() => {
    if (!canvasRef.current || salesData.length === 0) return undefined;
    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: salesData.map((d) => d.policy_type),
        datasets: [
          {
            label: 'Total Policies Sold',
            data: salesData.map((d) => d._count.policy_type),
            // Matched to login button primary blue
            backgroundColor: '#2563eb', 
            borderRadius: 6,
            maxBarThickness: 48,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { backgroundColor: '#1e293b', padding: 10, cornerRadius: 8, displayColors: false },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 12 } } },
          y: { beginAtZero: true, ticks: { precision: 0, color: '#94a3b8' }, grid: { color: '#f1f5f9' } },
        },
      },
    });
    return () => chartRef.current?.destroy();
  }, [canvasRef, salesData]);
}

function useDoughnutChart(canvasRef, claimsData) {
  const chartRef = useRef(null);
  useEffect(() => {
    if (!canvasRef.current || claimsData.length === 0) return undefined;
    chartRef.current = new Chart(canvasRef.current, {
      type: 'doughnut',
      data: {
        labels: claimsData.map((d) => d.status),
        datasets: [
          {
            label: 'Claims Status',
            data: claimsData.map((d) => d._count.status),
            backgroundColor: claimsData.map((d) => STATUS_COLORS[d.status] || '#94a3b8'),
            borderWidth: 0, // Removed inner borders for a cleaner look
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        cutout: '75%', // Slightly thinner doughnut for modern look
        plugins: {
          legend: {
            position: 'bottom',
            labels: { usePointStyle: true, pointStyle: 'circle', padding: 16, color: '#475569', font: { size: 12 } },
          },
          tooltip: { backgroundColor: '#1e293b', padding: 10, cornerRadius: 8 },
        },
      },
    });
    return () => chartRef.current?.destroy();
  }, [canvasRef, claimsData]);
}

const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [claimsData, setClaimsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [summaryRes, salesRes, claimsRes] = await Promise.all([
          fetchDashboardSummary(),
          fetchPolicySales(),
          fetchClaimsStats(),
        ]);
        setSummary(summaryRes.data);
        setSalesData(salesRes.data);
        setClaimsData(claimsRes.data);
      } catch (error) {
        console.error('Failed to load dashboard data', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const barCanvasRef = useRef(null);
  const doughnutCanvasRef = useRef(null);
  useBarChart(barCanvasRef, salesData);
  useDoughnutChart(doughnutCanvasRef, claimsData);

  const totalClaims = claimsData.reduce((sum, d) => sum + d._count.status, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-8 bg-blue-500 rounded-full mb-4"></div>
            <p className="text-slate-500 font-medium">Loading metrics...</p>
        </div>
      </div>
    );
  }

  return (
    // Changed bg-slate-50 to a very faint blue-gray to make white cards pop
    <div className="min-h-screen bg-[#f8fafc] p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-10">
          <p className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2">
            Admin Panel
          </p>
          <h1 className="text-4xl font-extrabold text-[#0f2942]">
            Welcome Back 👋
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Here's what's happening across your insurance platform today.
          </p>
        </div> 

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link to="/customers">
            <KpiCard icon={ShieldCheck} iconClass="bg-blue-50 text-blue-600" value={summary?.activePolicies || '4'} label="Active Policies" />
          </Link>
          <Link to="/customers">
            {/* Switched to emerald to feel more like modern finance */}
            <KpiCard icon={DollarSign} iconClass="bg-emerald-50 text-emerald-600" value={`$${summary?.totalRevenue || '200'}`} label="Premium this month" />
          </Link>
          <Link to="/customers">
            <KpiCard icon={AlertTriangle} iconClass="bg-amber-50 text-amber-600" value={summary?.pendingClaims || '0'} label="Open Claims" />
          </Link>
        </div>

        <h2 className="text-xl font-bold text-[#0f2942] mb-6">Analytics Overview</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* MODIFIED: Replaced borders with soft shadows and rounded-2xl */}
          <div className="rounded-2xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Policy Sales by Type</h3>
            <div className="h-72">
              <canvas ref={barCanvasRef} />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Claims Status</h3>
            <div className="relative h-72">
              <canvas ref={doughnutCanvasRef} />
              <div
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                style={{ paddingBottom: '2.5rem' }}
              >
                <span className="text-3xl font-extrabold text-[#0f2942] tabular-nums">{totalClaims}</span>
                <span className="text-sm font-medium text-slate-500">Total Claims</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AdminDashboard;