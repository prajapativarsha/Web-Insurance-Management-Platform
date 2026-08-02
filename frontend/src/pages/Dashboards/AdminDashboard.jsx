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

const KpiCard = ({ borderClass, icon: Icon, iconClass, value, label }) => (
  <div className={`rounded-xl border-l-4 ${borderClass} bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer`}>
    <div className="flex items-start gap-4">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconClass}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
        <h2 className="text-3xl font-bold text-slate-900 tabular-nums mt-1">{value}</h2>
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
            backgroundColor: '#6366f1',
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
            borderWidth: 2,
            borderColor: '#ffffff',
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        cutout: '72%',
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Loading dashboard metrics...</p>
      </div>
    );
  }

 
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-1">Administrator Dashboard</h1>
        <p className="text-slate-500 mb-8">Welcome back. Here is your system overview.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link to="/customers">
            <KpiCard borderClass="border-blue-500" icon={ShieldCheck} iconClass="bg-blue-50 text-blue-600" value={summary?.activePolicies} label="Active Policies" />
          </Link>
          <Link to="/customers">
            <KpiCard borderClass="border-green-500" icon={DollarSign} iconClass="bg-green-50 text-green-600" value={`$${summary?.totalRevenue}`} label="Premium this month" />
          </Link>
          <Link to="/customers">
            <KpiCard borderClass="border-orange-500" icon={AlertTriangle} iconClass="bg-orange-50 text-orange-600" value={summary?.pendingClaims} label="Open Claims" />
          </Link>
        </div>

        <h2 className="text-xl font-semibold text-slate-800 mb-4">Analytics Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-700 mb-4">Policy Sales by Type</h3>
            <div className="h-72">
              <canvas ref={barCanvasRef} />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-700 mb-4">Claims Status</h3>
            <div className="relative h-72">
              <canvas ref={doughnutCanvasRef} />
              <div
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                style={{ paddingBottom: '2.5rem' }}
              >
                <span className="text-2xl font-bold text-slate-900 tabular-nums">{totalClaims}</span>
                <span className="text-xs text-slate-500">Total Claims</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;