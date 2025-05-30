const express = require('express');
const asyncHandler = require('express-async-handler');
const FaqContent = require('../models/faqContentModel');
const { isAuth, isAdmin } = require('../utils.js');

const faqRouter = express.Router();

// Fetch FAQ content
faqRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const content = await FaqContent.findOne({});
    res.json(content);
  })
);

// Update FAQ content
faqRouter.put(
  '/',
  isAuth,
  isAdmin,
  asyncHandler(async (req, res) => {
    const { faqs } = req.body;
    const content = await FaqContent.findOneAndUpdate(
      {},
      { faqs },
      { new: true, upsert: true }
    );
    res.json(content);
  })
);

module.exports = faqRouter;
