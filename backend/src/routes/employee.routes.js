const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');
const { verifyToken, isAdminOrAgent } = require('../middleware/auth.middleware');

router.use(verifyToken);

router.post('/',employeeController.createEmployee);

router.get('/',employeeController.getEmployeeList);

router.get('/:id', employeeController.getEmployee);

router.put('/:id', employeeController.updateEmployee);

router.delete('/:id', employeeController.deactivateEmployee);

module.exports = router;


