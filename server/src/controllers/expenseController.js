
const Expense = require('../models/Expense');

// ADD EXPENSE
const addExpense = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;

    if (!amount || Number(amount) <= 0 || !category || !description) {
      return res.status(400).json({
        message: 'Please provide valid amount, category and description'
      });
    }

    const expense = await Expense.create({
      user: req.user.id,
      amount,
      category,
      description,
      date: date || Date.now()
    });

    res.status(201).json({
      message: 'Expense added successfully',
      expense
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ALL EXPENSES OF LOGGED-IN USER
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.user.id
    }).sort({ date: -1 });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE EXPENSE
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!expense) {
      return res.status(404).json({
        message: 'Expense not found'
      });
    }

    res.status(200).json({
      message: 'Expense updated successfully',
      expense
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE EXPENSE
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!expense) {
      return res.status(404).json({
        message: 'Expense not found'
      });
    }

    res.status(200).json({
      message: 'Expense deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense
};
