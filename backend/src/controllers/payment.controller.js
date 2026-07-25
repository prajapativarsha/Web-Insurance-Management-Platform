// payment.controller.js
const paymentService = require('../services/payment.service');

/**
 * Record a new payment
 * POST /policies/:id/payments
 */
const createPayment = async (req, res) => {
  try {
    const policyId = req.params.id;
    // For customers paying their own policy, customer_id comes from their token.
    // For agents/admins, it might be passed in the body. We'll default to the logged-in user.
    const customerId = req.body.customer_id || req.user.customer_id; 
    
    const payment = await paymentService.recordPayment(policyId, customerId, req.body);
    
    res.status(201).json({
      message: 'Payment recorded successfully',
      data: payment
    });
  } catch (error) {
    console.error('Error recording payment:', error);
    res.status(500).json({ error: 'Failed to record payment' });
  }
};

/**
 * Get payment history for a policy
 * GET /policies/:id/payments
 */
const getPolicyPayments = async (req, res) => {
  try {
    const policyId = req.params.id;
    const payments = await paymentService.getPaymentHistory(policyId);
    
    res.status(200).json({ data: payments });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ error: 'Failed to fetch payment history' });
  }
};

/**
 * get all payment history of a customer
 */
const getAllPayments = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customerPayments  = await paymentService.customerPaymentsHistory(customerId);
    res.status(200).json({
      message: 'Customer Payment history retrieved successfully',
      count: customerPayments.length,
      data: customerPayments
    });
  }
  catch (error) {
    console.error('Error fetching Customer Payment history:', error);
    res.status(500).json({ error: 'Failed to fetch Customer Payment history' });
  }
}

/**
 * Update payment status (Admin/Agent)
 * PATCH /payments/:id/status
 */
const updateStatus = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const { status } = req.body;
    
    const updatedPayment = await paymentService.updatePaymentStatus(paymentId, status);
    
    res.status(200).json({
      message: `Payment status updated to ${status}`,
      data: updatedPayment
    });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ error: 'Failed to update status' });
  }
};

/**
 * Get overdue premiums (Admin/Agent)
 * GET /payments/overdue
 */
const getOverdue = async (req, res) => {
  try {
    const overduePolicies = await paymentService.getOverduePremiums();
    
    res.status(200).json({
      message: 'Overdue policies retrieved successfully',
      count: overduePolicies.length,
      data: overduePolicies
    });
  } catch (error) {
    console.error('Error fetching overdue premiums:', error);
    res.status(500).json({ error: 'Failed to fetch overdue premiums' });
  }
};

module.exports = {
  createPayment,
  getPolicyPayments,
  updateStatus,
  getOverdue,
  getAllPayments
};