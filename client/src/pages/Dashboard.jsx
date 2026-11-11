
import { useEffect, useState } from 'react';
import { apiRequest } from '../services/api';

const chartColors = [
  '#C96F32',
  '#593A2A',
  '#D9A06C',
  '#8B6B52',
  '#E5B98C',
  '#A95020'
];

function formatCurrency(value) {
  return `₹${Number(value || 0).toLocaleString('en-IN', {
    maximumFractionDigits: 2
  })}`;
}

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [expenseData, budgetData] = await Promise.all([
          apiRequest('/expenses'),
          apiRequest('/budgets')
        ]);

        setExpenses(expenseData);
        setBudgets(budgetData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <p>Loading your financial dashboard...</p>;

  const monthlyExpenses = expenses.filter((expense) => {
    const date = new Date(expense.date);
    return date.getMonth() + 1 === month &&
      date.getFullYear() === year;
  });

  const totalSpent = monthlyExpenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0
  );

  const currentBudget = budgets.find(
    (budget) => budget.month === month && budget.year === year
  );

  const budgetAmount = Number(currentBudget?.amount || 0);
  const remaining = budgetAmount - totalSpent;
  const percentage = budgetAmount > 0
    ? (totalSpent / budgetAmount) * 100
    : 0;

  const budgetStatus = percentage > 100
    ? 'Over budget'
    : percentage >= 85
      ? 'Almost at limit'
      : percentage >= 65
        ? 'Keep an eye on spending'
        : 'On track';

  const budgetStatusClass = percentage > 100
    ? 'danger'
    : percentage >= 85
      ? 'warning'
      : 'healthy';

  // Group current-month expenses by category
  const categoryTotals = {};

  monthlyExpenses.forEach((expense) => {
    const category = expense.category || 'Other';
    categoryTotals[category] =
      (categoryTotals[category] || 0) + Number(expense.amount || 0);
  });

  const sortedCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1]);

  const visibleCategories = sortedCategories.slice(0, 5);
  const otherTotal = sortedCategories
    .slice(5)
    .reduce((sum, item) => sum + item[1], 0);

  if (otherTotal > 0) {
    visibleCategories.push(['Other', otherTotal]);
  }

  let currentAngle = 0;

  const donutSegments = visibleCategories.map(([category, amount], index) => {
    const segmentPercentage = totalSpent > 0
      ? (amount / totalSpent) * 100
      : 0;

    const start = currentAngle;
    currentAngle += segmentPercentage;

    return {
      category,
      amount,
      percentage: segmentPercentage,
      color: chartColors[index % chartColors.length],
      start,
      end: currentAngle
    };
  });

  const donutBackground = totalSpent > 0
    ? `conic-gradient(${donutSegments.map(
        (segment) =>
          `${segment.color} ${segment.start}% ${segment.end}%`
      ).join(', ')})`
    : '#E6D8C8';

  // Prepare the last six months of spending
  const monthlyChartData = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(year, month - 1 - (5 - index), 1);
    const chartMonth = date.getMonth();
    const chartYear = date.getFullYear();

    const amount = expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === chartMonth &&
          expenseDate.getFullYear() === chartYear;
      })
      .reduce(
        (sum, expense) => sum + Number(expense.amount || 0),
        0
      );

    return {
      label: date.toLocaleString('en-IN', { month: 'short' }),
      amount,
      isCurrent: chartMonth === month - 1 && chartYear === year
    };
  });

  const maximumMonthlyAmount = Math.max(
    ...monthlyChartData.map((item) => item.amount),
    1
  );

  return (
    <div className="dashboard-page">
      <div className="dashboard-intro">
        <div>
          <p className="dashboard-eyebrow">YOUR FINANCIAL OVERVIEW</p>
          <h1>Welcome to ExpenseMate</h1>
          <p>Here's how your money is looking this month.</p>
        </div>
        <div className="dashboard-date">
          {now.toLocaleString('en-IN', {
            month: 'long',
            year: 'numeric'
          })}
        </div>
      </div>

      {error && <p className="dashboard-error" role="alert">{error}</p>}

      {/* Financial summary cards */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <span className="stat-icon">B</span>
          <h3>Monthly Budget</h3>
          <h2>{formatCurrency(budgetAmount)}</h2>
          <p>Your monthly spending limit</p>
        </div>

        <div className="stat-card">
          <span className="stat-icon">S</span>
          <h3>Total Spent</h3>
          <h2>{formatCurrency(totalSpent)}</h2>
          <p>Spent this month</p>
        </div>

        <div className="stat-card">
          <span className="stat-icon">R</span>
          <h3>Remaining</h3>
          <h2>{formatCurrency(remaining)}</h2>
          <p>{remaining < 0 ? 'Amount over budget' : 'Available to spend'}</p>
        </div>

        <div className="stat-card">
          <span className="stat-icon">T</span>
          <h3>Transactions</h3>
          <h2>{monthlyExpenses.length}</h2>
          <p>Recorded this month</p>
        </div>
      </div>

      {/* Budget health */}
      <section className="analytics-panel budget-health">
        <div className="analytics-heading">
          <div>
            <h2>Budget Health</h2>
            <p>Monitor your monthly spending limit.</p>
          </div>
          <span className={`health-badge ${budgetStatusClass}`}>
            {budgetStatus}
          </span>
        </div>

        <div className="budget-health-values">
          <strong>{percentage.toFixed(1)}% used</strong>
          <span>{formatCurrency(Math.max(remaining, 0))} available</span>
        </div>

        <div className="analytics-progress">
          <div
            className={`analytics-progress-fill ${budgetStatusClass}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>

        {!budgetAmount && (
          <p className="analytics-empty">
            Set a monthly budget to start tracking your budget health.
          </p>
        )}

        {remaining < 0 && (
          <p className="budget-warning">
            You've exceeded your monthly budget by {formatCurrency(Math.abs(remaining))}.
          </p>
        )}
      </section>

      {/* Charts */}
      <div className="analytics-grid">
        <section className="analytics-panel">
          <div className="analytics-heading">
            <div>
              <h2>Spending by Category</h2>
              <p>Where your money goes this month.</p>
            </div>
          </div>

          {donutSegments.length === 0 ? (
            <p className="analytics-empty">
              Add expenses to see your category breakdown.
            </p>
          ) : (
            <div className="category-chart">
              <div
                className="donut-chart"
                style={{ background: donutBackground }}
              >
                <div className="donut-center">
                  <span>Total Spent</span>
                  <strong>{formatCurrency(totalSpent)}</strong>
                </div>
              </div>

              <div className="category-legend">
                {donutSegments.map((segment) => (
                  <div className="legend-item" key={segment.category}>
                    <span
                      className="legend-dot"
                      style={{ background: segment.color }}
                    />
                    <span className="legend-name">{segment.category}</span>
                    <strong>{segment.percentage.toFixed(1)}%</strong>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="analytics-panel">
          <div className="analytics-heading">
            <div>
              <h2>Monthly Spending</h2>
              <p>Your spending over the last six months.</p>
            </div>
          </div>

          <div className="monthly-chart">
            {monthlyChartData.map((item) => (
              <div className="monthly-bar-column" key={`${item.label}-${item.isCurrent}`}>
                <span className="bar-value">
                  {item.amount > 0
                    ? `₹${item.amount.toLocaleString('en-IN')}`
                    : '—'}
                </span>

                <div className="bar-track">
                  <div
                    className={`monthly-bar ${item.isCurrent ? 'current' : ''}`}
                    style={{
                      height: `${Math.max(
                        item.amount > 0
                          ? (item.amount / maximumMonthlyAmount) * 100
                          : 0,
                        item.amount > 0 ? 5 : 0
                      )}%`
                    }}
                  />
                </div>

                <span className="bar-label">{item.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Recent transactions */}
      <section className="analytics-panel recent-transactions">
        <div className="analytics-heading">
          <div>
            <h2>Recent Expenses</h2>
            <p>Your latest transactions this month.</p>
          </div>
          <span className="transaction-count">
            {monthlyExpenses.length} transactions
          </span>
        </div>

        {monthlyExpenses.length === 0 ? (
          <p className="analytics-empty">
            No expenses recorded this month.
          </p>
        ) : (
          monthlyExpenses.slice(0, 5).map((expense) => (
            <div className="dashboard-transaction" key={expense._id}>
              <div className="transaction-category-icon">
                {(expense.category || 'O').charAt(0).toUpperCase()}
              </div>

              <div className="transaction-details">
                <strong>{expense.description}</strong>
                <span>
                  {expense.category} · {new Date(expense.date).toLocaleDateString('en-IN')}
                </span>
              </div>

              <strong className="transaction-amount">
                − {formatCurrency(expense.amount)}
              </strong>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default Dashboard;
