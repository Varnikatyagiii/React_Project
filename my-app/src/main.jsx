import { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AuthPage from "./AuthPage.jsx";
import LandingPage from "./LandingPage.jsx";
import "./index.css";

function Root() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [showAuth, setShowAuth] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setShowAuth(false);
  };

  if (user) return <App user={user} onLogout={handleLogout} />;
  if (showAuth) return <AuthPage onLogin={handleLogin} />;
  return <LandingPage onGetStarted={() => setShowAuth(true)} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);