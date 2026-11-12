
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Auth({ onSuccess, onBack }) {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        await register(form);
      } else {
        await login({
          email: form.email,
          password: form.password
        });
      }

      onSuccess();
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsRegister(!isRegister);
    setError('');
    setShowPassword(false);
  };

  return (
    <main className="auth-page">

      <button
        type="button"
        className="auth-back-button"
        onClick={onBack}
      >
        <span>←</span> Back to Home
      </button>

      <div className="auth-layout">

        {/* LEFT BRANDING PANEL */}

        <section className="auth-brand-panel">

          <div className="auth-brand-logo">
            Expense<span>Mate.</span>
          </div>

          <div className="auth-brand-content">
            <p className="auth-eyebrow">
              SMARTER MONEY MANAGEMENT
            </p>

            <h1>
              Your money.
              <br />
              Your goals.
              <br />
              <span>Your control.</span>
            </h1>

            <p className="auth-brand-description">
              Take charge of your finances with a simpler
              way to track expenses, manage budgets and
              build better financial habits.
            </p>
          </div>

          <div className="auth-visual">

            <div className="auth-visual-top">
              <span>MONTHLY OVERVIEW</span>
              <span className="auth-visual-dot">●</span>
            </div>

            <div className="auth-visual-balance">
              <span>Total budget</span>
              <strong>₹30,000</strong>
            </div>

            <div className="auth-visual-progress">
              <div />
            </div>

            <div className="auth-visual-bottom">
              <div>
                <span>Amount spent</span>
                <strong>₹12,450</strong>
              </div>

              <div>
                <span>Remaining</span>
                <strong>₹17,550</strong>
              </div>
            </div>

            <div className="auth-visual-chart">
              <span style={{ height: '38%' }} />
              <span style={{ height: '65%' }} />
              <span style={{ height: '48%' }} />
              <span style={{ height: '82%' }} />
              <span style={{ height: '58%' }} />
              <span style={{ height: '95%' }} />
              <span style={{ height: '70%' }} />
            </div>

          </div>

          <p className="auth-brand-footer">
            Make every rupee count.
          </p>

        </section>

        {/* RIGHT LOGIN / REGISTER PANEL */}

        <section className="auth-form-panel">

          <div className="auth-form-content">

            <div className="auth-mobile-logo">
              Expense<span>Mate.</span>
            </div>

            <p className="auth-form-eyebrow">
              {isRegister ? 'GET STARTED TODAY' : 'WELCOME TO EXPENSEMATE'}
            </p>

            <h2>
              {isRegister ? 'Create your account' : 'Welcome back!'}
            </h2>

            <p className="auth-form-description">
              {isRegister
                ? 'Create an account and start taking control of your finances.'
                : 'Sign in to continue managing your money smarter.'}
            </p>

            {error && (
              <div className="auth-error" role="alert">
                {error}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>

              {isRegister && (
                <div className="auth-field">
                  <label htmlFor="auth-name">Full name</label>

                  <input
                    id="auth-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    autoComplete="name"
                    required
                  />
                </div>
              )}

              <div className="auth-field">
                <label htmlFor="auth-email">Email address</label>

                <input
                  id="auth-email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  autoComplete="email"
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="auth-password">Password</label>

                <div className="auth-password-wrapper">
                  <input
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    autoComplete={
                      isRegister ? 'new-password' : 'current-password'
                    }
                    minLength={6}
                    required
                  />

                  <button
                    type="button"
                    className="auth-toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>

                {isRegister && (
                  <span className="auth-field-hint">
                    Use at least 6 characters.
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="auth-submit-button"
                disabled={loading}
              >
                {loading
                  ? 'Please wait...'
                  : isRegister
                    ? 'Create Account'
                    : 'Sign In'}

                {!loading && <span>→</span>}
              </button>

            </form>

            <div className="auth-switch">
              <span>
                {isRegister
                  ? 'Already have an account?'
                  : "Don't have an account?"}
              </span>

              <button type="button" onClick={switchMode}>
                {isRegister ? 'Sign In' : 'Create an account'}
              </button>
            </div>

            <div className="auth-security-note">
              <span>●</span>
              Your account and financial information are protected.
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}

export default Auth;
