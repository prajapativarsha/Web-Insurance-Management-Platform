const policyService = require('../services/policy.service');
const { createPolicySchema, updatePolicySchema, renewPolicySchema } = require('../validations/policy.validation');

const createPolicy = async (req, res) => {
    try {
        // Run Zod Validation
        const validatedData = createPolicySchema.parse(req.body);
        
        // Execute Service
        const newPolicy = await policyService.createPolicy(validatedData);
        
        // Return standard JSON response
        res.status(201).json({ success: true, data: newPolicy });
    } catch (error) {
        res.status(400).json({ success: false, message: error.errors || error.message });
    }
};

const getPolicies = async (req, res) => {
    try {
        const result = await policyService.getPolicies(req.query);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getSinglePolicy = async (req, res) => {
    try {
        const policy = await policyService.getSinglePolicy(req.params.id);
        if (!policy) return res.status(404).json({ success: false, message: "Policy not found" });
        
        res.status(200).json({ success: true, data: policy });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updatePolicy = async (req, res) => {
    try {
        const validatedData = updatePolicySchema.parse(req.body);
        const updatedPolicy = await policyService.updatePolicy(req.params.id, validatedData);
        
        res.status(200).json({ success: true, data: updatedPolicy });
    } catch (error) {
        res.status(400).json({ success: false, message: error.errors || error.message });
    }
};

const cancelPolicy = async (req, res) => {
    try {
        const cancelledPolicy = await policyService.cancelPolicy(req.params.id);
        res.status(200).json({ success: true, data: cancelledPolicy, message: "Policy successfully cancelled" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const renewPolicy = async (req, res) => {
    try {
        const validatedData = renewPolicySchema.parse(req.body);
        const renewedPolicy = await policyService.renewPolicy(req.params.id, validatedData);
        
        res.status(200).json({ success: true, data: renewedPolicy, message: "Policy successfully renewed" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.errors || error.message });
    }
};

module.exports = {
    createPolicy,
    getPolicies,
    getSinglePolicy,
    updatePolicy,
    cancelPolicy,
    renewPolicy
};