const express = require('express');
const router = express.Router();

// Mock domain search - replace with Namecheap API integration
router.get('/search', (req, res) => {
  const { query } = req.query;
  
  // Simulate API call delay
  setTimeout(() => {
    res.json({
      results: [
        { domain: `${query}.crypto`, available: true, price: 5 },
        { domain: `${query}.sol`, available: true, price: 2 },
        { domain: `${query}.com`, available: false }
      ]
    });
  }, 500);
});

// Mock domain purchase
router.post('/purchase', (req, res) => {
  const { domain, paymentMethod } = req.body;
  
  // In production, this would interact with Solana Pay
  res.json({ 
    success: true,
    message: `Domain ${domain} purchased successfully`,
    transactionId: 'mock-tx-id-12345'
  });
});

module.exports = router;