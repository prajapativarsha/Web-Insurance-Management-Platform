const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const validate = require('../middleware/validate.middleware');
const { registerSchema, loginSchema } = require('../schemas/auth.schema');
const { loginLimiter } = require('../middleware/rateLimiter');

// POST /api/v1/auth/register
router.post('/register', validate(registerSchema), authController.register);

// POST /api/v1/auth/login
router.post('/login', loginLimiter, validate(loginSchema), authController.login);

module.exports = router;