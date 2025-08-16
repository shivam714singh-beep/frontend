import React, { useState } from 'react';
import authService from './authService';

export default function RegisterPage({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await authService.register(username, password);
      setSuccess(res.message || 'Registration successful! Please login.');
      setUsername('');
      setPassword('');
      if (onRegister) onRegister();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 350, margin: '80px auto', padding: 20, border: '1px solid #ccc', borderRadius: 10 }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 10 }}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 10 }}
        /><br />
        <button type="submit" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}
