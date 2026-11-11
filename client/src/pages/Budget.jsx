
import { useEffect, useState } from 'react';
import { apiRequest } from '../services/api';

function Budget() {
  const today = new Date();

  const [amount, setAmount] = useState('');
  const [budgets, setBudgets] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadBudgets = async () => {
    try {
      const data = await apiRequest('/budgets');
      setBudgets(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadBudgets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await apiRequest('/budgets', {
        method: 'POST',
        body: JSON.stringify({
          amount: Number(amount),
          month: today.getMonth() + 1,
          year: today.getFullYear()
        })
      });

      setMessage('Monthly budget saved successfully!');
      setAmount('');
      await loadBudgets();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="budget-page">
      <h1>Monthly Budget</h1>
      <p>Set a spending limit for the current month.</p>

      {error && <p role="alert">{error}</p>}
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter budget amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0.01"
          required
        />
        <button type="submit">Save Budget</button>
      </form>

      <h2>Saved Budgets</h2>

      {budgets.length === 0 ? (
        <p>No budgets created yet.</p>
      ) : (
        budgets.map((budget) => (
          <div className="budget-card" key={budget._id}>
            <h3>
              {new Date(budget.year, budget.month - 1).toLocaleString(
                'en-IN',
                { month: 'long', year: 'numeric' }
              )}
            </h3>
            <strong>
              ₹{Number(budget.amount).toLocaleString('en-IN')}
            </strong>
          </div>
        ))
      )}
    </div>
  );
}

export default Budget;
