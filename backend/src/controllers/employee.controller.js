const employeeService = require('../services/employee.service');
const { createEmployeeSchema, updateEmployeeSchema } = require('../validations/employee.validation');

const createEmployee = async (req, res) => {
    try {
        // Zod validation parses the entire req object to check req.body
        const validatedData = createEmployeeSchema.parse(req);
        const employee = await employeeService.createEmployee(validatedData.body);
        
        res.status(201).json({ success: true, data: employee });
    } catch (error) {
        // Zod validation errors come back as an array in error.errors
        res.status(400).json({ success: false, message: error.errors || error.message });
    }
};

const getEmployeeList = async (req, res) => {
    try {
        // Extract the search query string if it exists (?search=john)
        const search = req.query.search || "";
        const employees = await employeeService.getEmployeeList(search);
        
        res.status(200).json({ success: true, data: employees });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getEmployee = async (req, res) => {
    try {
        const employee = await employeeService.getEmployee(req.params.id);
        
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }
        
        res.status(200).json({ success: true, data:employee });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const validatedData = updateEmployeeSchema.parse(req);
        const employee = await employeeService.updateEmployee(req.params.id, validatedData.body);
        
        res.status(200).json({ success: true, data:employee });
    } catch (error) {
        res.status(400).json({ success: false, message: error.errors || error.message });
    }
};

const deactivateEmployee = async (req, res) => {
    try {
        await employeeService.deactivateEmployee(req.params.id);
        
        res.status(200).json({ success: true, message: "Employee account deactivated successfully" });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};


module.exports = { 
    createEmployee, 
    getEmployeeList, 
    getEmployee, 
    updateEmployee, 
    deactivateEmployee,           
};


