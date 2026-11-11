
const Budget = require('../models/budget');

// SET OR UPDATE MONTHLY BUDGET
const setBudget = async (req, res) => {
  try {
    const { amount, month, year } = req.body;

    if (
      !Number.isFinite(Number(amount)) ||
      Number(amount) <= 0 ||
      !Number.isInteger(Number(month)) ||
      Number(month) < 1 ||
      Number(month) > 12 ||
      !Number.isInteger(Number(year)) ||
      Number(year) < 2000
    ) {
      return res.status(400).json({
        message: 'Please provide a valid amount, month and year'
      });
    }

    const budget = await Budget.findOneAndUpdate(
      {
        user: req.user.id,
        month: Number(month),
        year: Number(year)
      },
      {
        amount: Number(amount)
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true
      }
    );

    res.status(200).json({
      message: 'Budget saved successfully',
      budget
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET USER BUDGETS
const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({
      user: req.user.id
    }).sort({ year: -1, month: -1 });

    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  setBudget,
  getBudgets
};
