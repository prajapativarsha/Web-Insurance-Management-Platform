const customerService = require('../services/customer.service');
const { createCustomerSchema, updateCustomerSchema } = require('../validations/customer.validation');

const createCustomer = async (req, res) => {
    try {
        // Zod validation parses the entire req object to check req.body
        const validatedData = createCustomerSchema.parse(req);
        const customer = await customerService.createCustomer(validatedData.body);
        
        res.status(201).json({ success: true, data: customer });
    } catch (error) {
        // Zod validation errors come back as an array in error.errors
        res.status(400).json({ success: false, message: error.errors || error.message });
    }
};

const getCustomerList = async (req, res) => {
    try {
        // Extract the search query string if it exists (?search=john)
        const search = req.query.search || "";
        const customers = await customerService.getCustomerList(search);
        
        res.status(200).json({ success: true, data: customers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getCustomer = async (req, res) => {
    try {
        const customer = await customerService.getCustomerById(req.params.id);
        
        if (!customer) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }
        
        res.status(200).json({ success: true, data: customer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const validatedData = updateCustomerSchema.parse(req);
        const customer = await customerService.updateCustomer(req.params.id, validatedData.body);
        
        res.status(200).json({ success: true, data: customer });
    } catch (error) {
        res.status(400).json({ success: false, message: error.errors || error.message });
    }
};

const deactivateCustomer = async (req, res) => {
    try {
        await customerService.deactivateCustomer(req.params.id);
        
        res.status(200).json({ success: true, message: "Customer account deactivated successfully" });
    } catch (error) {
        // Catch block handles the "Customer not found" error thrown in the service
        res.status(404).json({ success: false, message: error.message });
    }
};


const uploadDocument = async (req, res) => {
    try {
        const customerId = parseInt(req.params.id);
        
        if (!req.file) {
            return res.status(400).json({ error: 'No document file provided.' });
        }

        const { document_type } = req.body; 

        // NOTE: You can move this Prisma logic into customer.service.js to match your current pattern
        const newDocument = await prisma.document.create({
            data: {
                owner_type: 'customer',          
                owner_id: customerId,            
                document_type: document_type || 'Other',
                file_url: req.file.path,         
                verification_status: 'pending'   
            }
        });

        res.status(201).json({ success: true, message: 'Identity document uploaded.', data: newDocument });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to upload document.' });
    }
};

// You will also eventually need these to fulfill the API requirements:
const getCustomerDocuments = async (req, res) => { /* logic to fetch documents */ };
const verifyDocument = async (req, res) => { /* logic for Agent to verify document */ };

module.exports = { 
    createCustomer, 
    getCustomerList, 
    getCustomer, 
    updateCustomer, 
    deactivateCustomer,
    uploadDocument,       
    getCustomerDocuments, 
    verifyDocument        
};


