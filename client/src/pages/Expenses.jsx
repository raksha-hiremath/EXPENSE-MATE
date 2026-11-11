
import { useEffect, useState } from 'react';
import { apiRequest } from '../services/api';

const initialForm = {
  amount: '',
  category: 'Food',
  description: '',
  date: new Date().toISOString().split('T')[0]
};

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const loadExpenses = async () => {
    try {
      const data = await apiRequest('/expenses');
      setExpenses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const expenseData = {
        ...form,
        amount: Number(form.amount)
      };

      if (editingId) {
        await apiRequest(`/expenses/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(expenseData)
        });

        setMessage('Expense updated successfully!');
      } else {
        await apiRequest('/expenses', {
          method: 'POST',
          body: JSON.stringify(expenseData)
        });

        setMessage('Expense added successfully!');
      }

      resetForm();
      await loadExpenses();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (expense) => {
    setEditingId(expense._id);

    setForm({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: new Date(expense.date).toISOString().split('T')[0]
    });

    setMessage('');
    setError('');

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) {
      return;
    }

    setError('');
    setMessage('');

    try {
      await apiRequest(`/expenses/${id}`, {
        method: 'DELETE'
      });

      setExpenses((previous) =>
        previous.filter((expense) => expense._id !== id)
      );

      if (editingId === id) {
        resetForm();
      }

      setMessage('Expense deleted successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Loading expenses...</p>;
  }

  return (
    <div className="expenses-page">
      <h1>Manage Expenses</h1>
      <p>Add, edit and manage your daily transactions.</p>

      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}

      <form onSubmit={handleSubmit}>
        <h2>
          {editingId ? 'Edit Expense' : 'Add New Expense'}
        </h2>

        <input
          type="number"
          name="amount"
          placeholder="Amount (₹)"
          value={form.amount}
          onChange={handleChange}
          min="0.01"
          step="0.01"
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Education</option>
          <option>Entertainment</option>
          <option>Health</option>
          <option>Rent</option>
          <option>Other</option>
        </select>

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? 'Update Expense' : 'Add Expense'}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm}>
            Cancel Edit
          </button>
        )}
      </form>

      <h2>All Expenses ({expenses.length})</h2>

      {expenses.length === 0 ? (
        <p>No expenses found. Add your first expense above!</p>
      ) : (
        expenses.map((expense) => (
          <div className="expense-item" key={expense._id}>
            <div>
              <strong>{expense.description}</strong>
              <p>
                {expense.category} |{' '}
                {new Date(expense.date).toLocaleDateString('en-IN')}
              </p>
            </div>

            <strong>
              ₹{Number(expense.amount).toLocaleString('en-IN')}
            </strong>

            <div className="expense-actions">
              <button
                type="button"
                onClick={() => handleEdit(expense)}
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => handleDelete(expense._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Expenses;
