// Adjust this if your backend is running on a different host/port
const API_BASE = 'http://localhost:8081';

const authService = {
  /**
   * Login API
   */
  login: async (username, password) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      throw new Error('Login failed. Please check username or password.');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
    return data;
  },

  /**
   * Registration API - works with JSON OR plain text response
   */
  register: async (username, password) => {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      const errMsg = await response.text();
      throw new Error(`Registration failed: ${errMsg}`);
    }

    // Try parsing JSON, if it fails, use plain text
    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = { message: await response.text() };
    }
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  },

  getToken: () => localStorage.getItem('token'),
  getRole: () => localStorage.getItem('role'),
  isAuthenticated: () => !!localStorage.getItem('token')
};

export default authService;
