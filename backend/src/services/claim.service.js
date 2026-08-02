const prisma = require("../config/prisma");
/**
 * 1. CREATE: Customer submits a new claim
 */
const createClaim = async (customerId, policyId, description, claimAmount) => {
  // Generate a unique claim number (e.g., CLM-1678901234-543)
  const claimNumber = `CLM-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  return await prisma.claims.create({
    data: {
      claim_number: claimNumber,
      customer_id: customerId,
      policy_id: parseInt(policyId),
      description: description,
      claim_amount: parseFloat(claimAmount),
      // 'status' and 'submitted_date' are omitted because your Prisma schema 
      // automatically defaults them to "submitted" and now()!
    },
  });
};

/**
 * 2. READ: Fetch all claims for a specific customer (Customer Dashboard)
 */
const getMyClaims = async (customerId) => {
  return await prisma.claims.findMany({
    where: { customer_id: parseInt(customerId) },
    // include: { policies: true }, // Joins the policy details so the customer can see what they claimed against
    orderBy: { submitted_date: 'desc' }, // Show newest claims first
  });
};
const getMyClaimsById = async (policyId)=>{
    return await prisma.claims.findMany({
    where: { policy_id: parseInt(policyId) },
    orderBy: { submitted_date: 'desc' }, // Show newest claims first
  });
}

/**
 * 3. READ: Fetch claims for Agents/Admins (Agent Dashboard)
 * Allows optional filtering by status (e.g., fetching only "submitted" claims to review)
 */
const getAllClaims = async (statusFilter) => {
  const query = {
    include: { customers: true, policies: true }, // Pull in rich data for the agent to review
    orderBy: { submitted_date: 'desc' },
  };

  
  if (statusFilter) {
    query.where = { status: statusFilter };
  }
  
  return await prisma.claims.findMany(query);
};

const getAgentClaims = async (agentId) => {
  // const query = {
  //   include: { customers: true, policies: true }, // Pull in rich data for the agent to review
  //   orderBy: { submitted_date: 'desc' },
  // };

  
  // if (statusFilter) {
  //   query.where = { status: statusFilter };
  // }
  
  return await prisma.claims.findMany({
    where : { assigned_to : agentId} 
  });
};

const assignClaim = async (claimId, agentId) => {
  return await prisma.claims.update({
    where: { id: claimId },
    data: {
      status: 'under_review',
      assigned_to: agentId,
    },
  });
};

/**
 * 4. UPDATE: Agent verifies a claim
 */
const verifyClaim = async (claimId, agentId) => {
  return await prisma.claims.update({
    where: { id: claimId },
    data: {
      status: 'verified',
      verified_by: agentId,
      verified_at: new Date(),
    },
  });
};

/**
 * 5. UPDATE: Agent approves a claim
 */
const approveClaim = async (claimId, agentId) => {
  return await prisma.claims.update({
    where: { id: claimId },
    data: {
      status: 'approved',
      approved_by: agentId,
      approved_at: new Date(),
    },
  });
};

/**
 * 6. UPDATE: Agent rejects a claim
 */
const rejectClaim = async (claimId, reason) => {
  return await prisma.claims.update({
    where: { id: claimId },
    data: {
      status: 'rejected',
      rejection_reason: reason,
      // Note: We don't necessarily track "who" rejected it in your current schema, 
      // but we do capture the mandatory reason string.
    },
  });
};

module.exports = {
  createClaim,
  getMyClaims,
  getMyClaimsById,
  getAgentClaims,
  assignClaim,
  getAllClaims,
  verifyClaim,
  approveClaim,
  rejectClaim
};