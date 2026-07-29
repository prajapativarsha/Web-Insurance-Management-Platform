const prisma = require('../config/prisma');

// Group claims by their status (Pending, Approved, Rejected)
const getClaimsStats = async () => {
  const stats = await prisma.claims.groupBy({
    by: ['status'],
    _count: {
      status: true,
    },
  });
  return stats;
};

// Calculate the total sum of all premium payments collected
const getPremiumCollections = async () => {
  const total = await prisma.payment.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      status: 'success', // Only count successful payments
    }
  });
  return total._sum.amount || 0;
};

// Get policy counts grouped by their type (e.g., LIFE, HEALTH, AUTO)
const getPolicySales = async () => {
  const sales = await prisma.policies.groupBy({
    by: ['policy_type'], // Adjust 'type' if your schema uses a different field name (e.g., 'policyType')
    _count: {
      policy_type: true,
    },
  });
  return sales;
};

// Fetch high-level KPIs for the main dashboard overview
 const getDashboardSummary = async () => {
  // Execute queries concurrently for better performance
  const [totalCustomers, activePolicies, pendingClaims, totalPremiums] = await Promise.all([
    prisma.users.count({ where: { role: 'customer' } }),
    prisma.policies.count({ where: { status: 'active' } }), 
    prisma.claims.count({ where: { status: 'submitted' } }),
    prisma.payments.aggregate({
      _sum: { amount: true },
      where: { status: 'pending' }
    })
  ]);

  return {
    totalCustomers,
    activePolicies,
    pendingClaims,
    totalRevenue: totalPremiums._sum.amount || 0
  };
};

module.exports ={
    getClaimsStats,
    getPremiumCollections,
    getPolicySales,
    getDashboardSummary
}