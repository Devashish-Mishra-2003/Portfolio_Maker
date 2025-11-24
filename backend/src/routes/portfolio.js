const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const { requireAuth } = require('@clerk/express');

router.post('/', requireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    const portfolioData = req.body;

    let portfolio = await Portfolio.findOne({ userId });
    if (portfolio) {
      Object.assign(portfolio, portfolioData);
      await portfolio.save();
    } else {
      portfolio = new Portfolio({ userId, ...portfolioData });
      await portfolio.save();
    }
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', requireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    const portfolio = await Portfolio.findOne({ userId });
    if (!portfolio) return res.status(404).json({ error: 'Portfolio not found' });
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const portfolio = await Portfolio.findOne({ userId });
    if (!portfolio) return res.status(404).json({ error: 'Public portfolio not found' });
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
