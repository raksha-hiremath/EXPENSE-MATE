
import { useState } from 'react';
import './App.css';

import { useAuth } from './context/AuthContext';
import Auth from './components/Auth';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Budget from './pages/Budget';

function App() {
  const { user, logout } = useAuth();
  const [page, setPage] = useState('home');

  if (!user && page === 'auth') {
    return (
      <Auth
        onSuccess={() => setPage('dashboard')}
        onBack={() => setPage('home')}
      />
    );
  }

  if (user) {
    return (
      <div className="app">
        <nav className="navbar">
          <a href="#" className="logo" onClick={() => setPage('dashboard')}>
            Expense<span>Mate</span>
          </a>

          <div className="nav-links">
            <button onClick={() => setPage('dashboard')}>Dashboard</button>
            <button onClick={() => setPage('expenses')}>Expenses</button>
            <button onClick={() => setPage('budget')}>Budget</button>
            <span>Hi, {user.name}</span>
            <button onClick={() => {
              logout();
              setPage('home');
            }}>Logout</button>
          </div>
        </nav>

        <main style={{ padding: '40px 6%', minHeight: '75vh' }}>
          {page === 'dashboard' && <Dashboard />}
          {page === 'expenses' && <Expenses />}
          {page === 'budget' && <Budget />}
        </main>

        <footer className="footer">
          <p>© 2026 ExpenseMate. Personal finance made simple.</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="app">
      <nav className="navbar">
        <a href="#home" className="logo">
          Expense<span>Mate</span>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <button className="login-btn" onClick={() => setPage('auth')}>
            Login
          </button>
          <button className="signup-btn" onClick={() => setPage('auth')}>
            Get Started
          </button>
        </div>
      </nav>

      <section className="hero-section" id="home">
        <div className="hero-content">
          <p className="hero-label">PERSONAL FINANCE, SIMPLIFIED</p>
          <h1>Know where your <span>money goes.</span></h1>
          <p className="hero-description">
            Track your spending, manage your monthly budget,
            and build better financial habits with ExpenseMate.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => setPage('auth')}>
              Get Started →
            </button>
            <a href="#features" className="secondary-btn">
              Explore Features
            </a>
          </div>
        </div>

        <div className="dashboard-wrapper">
          <div className="dashboard-card">
            <p>Your personal finance workspace</p>
            <h2>ExpenseMate</h2>
            <p>Track expenses. Set budgets. Make smarter decisions.</p>
          </div>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="section-heading">
          <p>CORE FEATURES</p>
          <h2>Everything you need to manage your money.</h2>
        </div>

        <div className="feature-grid">
          {[
            ['01', 'Track Expenses', 'Record and organize daily transactions.'],
            ['02', 'Visualize Spending', 'Understand your financial habits.'],
            ['03', 'Set Budgets', 'Create monthly spending limits.'],
            ['04', 'Smart Insights', 'Make informed financial decisions.']
          ].map(([number, title, description]) => (
            <div className="feature-card" key={number}>
              <div className="feature-number">{number}</div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="how-section" id="how-it-works">
        <div className="section-heading">
          <p>HOW IT WORKS</p>
          <h2>Four steps towards better financial habits.</h2>
        </div>
        <div className="steps">
          {['Add Expenses', 'Set a Budget', 'Monitor Spending', 'Understand Your Habits'].map(
            (step, index) => (
              <div className="step" key={step}>
                <div className="step-number">0{index + 1}</div>
                <h3>{step}</h3>
              </div>
            )
          )}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <p>TAKE THE FIRST STEP</p>
          <h2>Your money deserves your attention.</h2>
          <button className="cta-btn" onClick={() => setPage('auth')}>
            Start Managing Your Money →
          </button>
        </div>
      </section>

      <footer className="footer">
        <a href="#home" className="logo">
          Expense<span>Mate</span>
        </a>
        <p>© 2026 ExpenseMate. Personal finance made simple.</p>
      </footer>
    </div>
  );
}

export default App;
