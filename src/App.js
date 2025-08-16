import React, { useState } from "react";
import FileUpload from "./FileUpload";
import WebSocketListener from "./WebSocketListener";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import authService from "./authService";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.isAuthenticated());
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => { authService.logout(); setIsLoggedIn(false); };
  const toggleRegister = () => setShowRegister(!showRegister);

  if (!isLoggedIn) {
    return showRegister ? (
      <>
        <RegisterPage onRegister={() => setShowRegister(false)} />
        <p style={{ textAlign: 'center' }}>
          Already have an account?{" "}
          <button onClick={toggleRegister}>Login here</button>
        </p>
      </>
    ) : (
      <>
        <LoginPage onLogin={handleLogin} />
        <p style={{ textAlign: 'center' }}>
          Don't have an account?{" "}
          <button onClick={toggleRegister}>Register here</button>
        </p>
      </>
    );
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: 600, margin: "50px auto" }}>
      <h1>📁 Document Uploader</h1>
      <FileUpload />
      <WebSocketListener />
      <button style={{ marginTop: 30 }} onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default App;
