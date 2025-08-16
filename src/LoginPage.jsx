import React, { useState } from 'react';
import authService from "./authService";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await authService.login(username, password);
      onLogin();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 350, margin: '80px auto', padding: 20, border: '1px solid #ccc', borderRadius: 10 }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={{ width:"100%", marginBottom:10 }}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width:"100%", marginBottom:10 }}
        /><br />
        <button type="submit" disabled={loading} style={{ width:"100%" }}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
}
