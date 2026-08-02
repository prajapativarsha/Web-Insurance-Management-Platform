const claimService = require('../services/claim.service');
const prisma = require('../config/prisma')
/**
 * 1. CREATE: Customer submits a new claim
 * POST /api/v1/claims
 */
const createClaim = async (req, res) => {
  try {
    // Extract the authenticated customer's ID from the JWT token middleware
    const customerId = req.user.customer_id;
  
    const { policy_id, description, claim_amount } = req.body;
    const newClaim = await claimService.createClaim(
      customerId, 
      policy_id, 
      description, 
      claim_amount
    );

     let newDocument = null;
        if (req.file) {
            const documentPath = `/uploads/${req.file.filename}`;
            
            // 3. Create the Document record linked to the Claim
            newDocument = await prisma.documents.create({
              data :{
                owner_id: newClaim.id, // Link to the claim we just made
                owner_type : 'claim',
                document_type: 'claim_evidence',
                file_url: documentPath,
              }
                
               
            });
        }
    
    res.status(201).json({
      success: true,
      message: "Claim submitted successfully",
      data: newClaim
    });
  } catch (error) {
    console.error("Error creating claim:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * 2. READ: Get all claims for the logged-in customer
 * GET /api/v1/customers/claims
 */
const getMyClaims = async (req, res) => {
  try {
    const customerId = req.user.customer_id;
    const claims = await claimService.getMyClaims(customerId);
    
    res.status(200).json({ success: true, data: claims });
  } catch (error) {
    console.error("Error fetching customer claims:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getMyClaimsById = async (req, res) => {
  try {
    const policyId = req.params.id;
    const claims = await claimService.getMyClaimsById(policyId);
    
    res.status(200).json({ success: true, data: claims });
  } catch (error) {
    console.error("Error fetching policy claims:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * 3. READ: Get all claims (For Agents & Admins)
 * GET /api/v1/claims?status=submitted
 */
const getAllClaims = async (req, res) => {
  try {
    // Allows agents to filter via query parameter (e.g., ?status=submitted)
    const { status } = req.query; 
    const claims = await claimService.getAllClaims(status);
    
    res.status(200).json({ success: true, data: claims });
  } catch (error) {
    console.error("Error fetching all claims:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getAgentClaims = async (req, res) => {
  try {
    const agent_id = req.user.agent_id;
    const claims = await claimService.getAgentClaims(agent_id);
    
    res.status(200).json({ success: true, data: claims });
  } catch (error) {
    console.error("Error fetching all claims:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const assignClaim = async (req, res) => {
    try {
        const claimId = parseInt(req.params.id);
        const agentId = parseInt(req.params.e_id);

        const assignedClaim = await claimService.assignClaim(claimId, agentId);

        res.status(200).json({
            success: true,
            message: "Claim successfully assigned",
            data: assignedClaim,
        });
    } catch (error) {
        console.error("Error verifying claim:", error);
        res.status(500).json({
            success: false,
            message: "Error verifying claim",
        });
    }
};

/**
 * 4. UPDATE: Agent verifies a claim
 * PUT /api/v1/claims/:id/verify
 */
const verifyClaim = async (req, res) => {
  try {
    const claimId = parseInt(req.params.id);
    const agentId = req.user.agent_id; // Extract agent ID from token

    const verifiedClaim = await claimService.verifyClaim(claimId, agentId);
    
    res.status(200).json({
      success: true,
      message: "Claim successfully verified",
      data: verifiedClaim
    });
  } catch (error) {
    console.error("Error verifying claim:", error);
    res.status(500).json({ success: false, message: "Error verifying claim" });
  }
};

/**
 * 5. UPDATE: Agent approves a claim
 * PUT /api/v1/claims/:id/approve
 */
const approveClaim = async (req, res) => {
  try {
    const claimId = parseInt(req.params.id);
    const agentId = req.user.agent_id;

    const approvedClaim = await claimService.approveClaim(claimId, agentId);
    
    res.status(200).json({
      success: true,
      message: "Claim approved",
      data: approvedClaim
    });
  } catch (error) {
    console.error("Error approving claim:", error);
    res.status(500).json({ success: false, message: "Error approving claim" });
  }
};

/**
 * 6. UPDATE: Agent rejects a claim
 * PUT /api/v1/claims/:id/reject
 */
const rejectClaim = async (req, res) => {
  try {
    const claimId = parseInt(req.params.id);
    const { rejection_reason } = req.body;

    const rejectedClaim = await claimService.rejectClaim(claimId, rejection_reason);
    
    res.status(200).json({
      success: true,
      message: "Claim rejected",
      data: rejectedClaim
    });
  } catch (error) {
    console.error("Error rejecting claim:", error);
    res.status(500).json({ success: false, message: "Error rejecting claim" });
  }
};



const uploadClaimDocuments = async (req, res) => {
    try {
        const claimId = parseInt(req.params.id);

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No supporting documents provided.' });
        }

        // Map the uploaded files into an array of Prisma data objects
        const documentRecords = req.files.map(file => ({
            owner_type: 'claim',
            owner_id: claimId,
            document_type: 'supporting_document',
            file_url: file.path, 
            verification_status: 'pending'
        }));

        // NOTE: You can move this Prisma logic into claim.service.js to match your current pattern
        const savedDocuments = await prisma.document.createMany({
            data: documentRecords
        });

        res.status(201).json({ success: true, message: `${savedDocuments.count} claim documents uploaded.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to upload claim documents.' });
    }
};

module.exports = {
  createClaim,
  getMyClaims,
  getMyClaimsById,
  getAllClaims,
  getAgentClaims,
  assignClaim,
  verifyClaim,
  approveClaim,
  rejectClaim,
  uploadClaimDocuments
};