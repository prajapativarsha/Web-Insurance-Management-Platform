const reportService = require('../services/report.service');

const getClaimsStats = async (req, res) => {
  try {
    const stats = await reportService.getClaimsStats();
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    console.error("Error fetching claims stats:", error);
    res.status(500).json({ success: false, message: 'Failed to fetch claim statistics' });
  }
};

const getPremiumCollections = async (req,res) => {
    try {
    const stats = await reportService. getPremiumCollections();
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    console.error("Error fetching claims stats:", error);
    res.status(500).json({ success: false, message: 'Failed to fetch claim statistics' });
  }
}

// Repeat this pattern for your other reporting controllers
// Fetch Policy Sales
const getPolicySales = async (req, res) => {
  try {
    const data = await reportService.getPolicySales();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching policy sales:", error);
    res.status(500).json({ success: false, message: 'Failed to fetch policy sales data' });
  }
};

// Fetch Dashboard Summary KPIs
const getDashboardSummary = async (req, res) => {
  try {
    const data = await reportService.getDashboardSummary();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching dashboard summary:", error);
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard summary' });
  }
};
module.exports = {
   getClaimsStats,
   getPremiumCollections,
   getPolicySales,
   getDashboardSummary 
}