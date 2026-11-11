
const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');

const {
  setBudget,
  getBudgets
} = require('../controllers/budgetController');

router.post('/', protect, setBudget);
router.get('/', protect, getBudgets);

module.exports = router;
