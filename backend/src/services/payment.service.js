const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({adapter});
const crypto = require('crypto');

//generating transaction id 
function generateTransactionRef() {
    // 1. Get current date/time as a string (Format: YYYYMMDDHHMMSS)
    const now = new Date();
    const timestamp = now.toISOString()
        .replace(/[-:T.]/g, '') // Remove formatting characters
        .slice(0, 14);          // Keep only up to the seconds

    // 2. Generate a random 4-character uppercase alphanumeric string
    const randomChars = crypto.randomBytes(2).toString('hex').toUpperCase();

    // 3. Combine them
    return `TXN-${timestamp}-${randomChars}`;
}

/**
 * 1. Record a new payment
 */

const recordPayment = async (policyId, customerId, paymentData) => {
  if (paymentData.status === 'success') {
    return await prisma.$transaction(async (tx) => {
      // A. Create the payment
      const payment = await tx.payments.create({
        data: {
          policy_id: parseInt(policyId),
          customer_id:parseInt(customerId), 
          amount: parseFloat(paymentData.amount),
          payment_method: paymentData.payment_method,
          transaction_ref: paymentData.transaction_ref,
          receipt_path: paymentData.receipt_path,
          status: 'success',
        },
      });

      // B. Fetch the policy to calculate the next due date
      let nextDue = new Date(policy.next_due_date || policy.start_date);
      
      // Advance the date based on frequency
      if (policy.premium_frequency === 'monthly') {
        nextDue.setMonth(nextDue.getMonth() + 1);
      } else if (policy.premium_frequency === 'yearly') {
        nextDue.setFullYear(nextDue.getFullYear() + 1);
      }

      // C. Update the policy
      await tx.policies.update({
        where: { id: parseInt(policyId) },
        data: { next_due_date: nextDue },
      });

      return payment;
    });
  } else {
    // If pending, just record the payment without advancing the due date
    return await prisma.payments.create({
      data: {
        policy_id: parseInt(policyId),
        customer_id: parseInt(customerId),
        amount: parseFloat(paymentData.amount),
        payment_method: paymentData.payment_method,
        transaction_ref: generateTransactionRef(),
        receipt_path: paymentData.receipt_path,
        status: 'pending',
      },
    });
  }
};

/**
 * 2. Get payment history for a specific policy
 */
const getPaymentHistory = async (policyId) => {
  return await prisma.payments.findMany({
    where: { policy_id: parseInt(policyId) },
    orderBy: { payment_date: 'desc' }, // Newest payments first
  });
};

/**
 * 3. Update Payment Status (Admin/Agent)
 */
const updatePaymentStatus = async (paymentId, newStatus) => {
  return await prisma.payments.update({
    where: { id: parseInt(paymentId) },
    data: { status: newStatus },
  });
};

/**
 * 4. Get Overdue Premiums (Admin/Agent Dashboard)
 */
const getOverduePremiums = async () => {
  return await prisma.policies.findMany({
    where: {
      status: 'active',
      next_due_date: {
        lt: new Date(),
      },
    },
    include: {
      customers: {
        select: { first_name: true, last_name: true, email: true, phone_number: true }
      }
    }
  });
};
 
// Get a payments history of a customer
const customerPaymentsHistory = async (customerId) => {
  return await prisma.payments.findMany({
    where: { customer_id: parseInt(customerId) },
    orderBy: { payment_date: 'desc' }, // Newest payments first
  });
};

// THIS IS THE CRITICAL PART THAT WAS MISSING
module.exports = {
  recordPayment,
  getPaymentHistory,
  updatePaymentStatus,
  getOverduePremiums,
  customerPaymentsHistory
};