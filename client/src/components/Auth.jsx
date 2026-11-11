
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Auth({ onSuccess, onBack }) {
  const [isRegister, setIsRegister] = useState(false);
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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <button onClick={onBack}>← Back to Home</button>

      <h1>{isRegister ? 'Create Account' : 'Welcome Back'}</h1>
      <p>
        {isRegister
          ? 'Join ExpenseMate and manage your finances.'
          : 'Log in to manage your expenses.'}
      </p>

      {error && <p role="alert">{error}</p>}

      <form onSubmit={handleSubmit}>
        {isRegister && (
          <input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password (minimum 6 characters)"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          minLength={6}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Please wait...' : isRegister ? 'Register' : 'Login'}
        </button>
      </form>

      <p>
        {isRegister ? 'Already registered?' : "Don't have an account?"}
        {' '}
        <button onClick={() => {
          setIsRegister(!isRegister);
          setError('');
        }}>
          {isRegister ? 'Login' : 'Create Account'}
        </button>
      </p>
    </div>
  );
}

export default Auth;
