import { useState } from "react";
import { loginUser, registerUser } from "./api";

const theme = {
  green900: "#173404",
  green800: "#27500A",
  green700: "#3B6D11",
  green600: "#639922",
  green200: "#C0DD97",
  green100: "#EAF3DE",
  white: "#ffffff",
  gray50: "#F8F7F4",
  gray100: "#F1EFE8",
  gray200: "#D3D1C7",
  gray500: "#888780",
  gray800: "#444441",
};

export default function AuthPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    role: "consumer",
    location: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      if (isLogin) {
        const res = await loginUser({ email: form.email, password: form.password });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        onLogin(res.data.user);
      } else {
        await registerUser({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
          phone: form.phone,
          role: form.role,
          location: form.location,
        });
        setIsLogin(true);
        setError("Registered successfully! Please login.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: theme.gray50, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: theme.white, border: `1px solid ${theme.gray200}`, borderRadius: 16, padding: "2rem", width: "100%", maxWidth: 400 }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 700, color: theme.green700 }}>🌿 FarmDirect</div>
          <div style={{ fontSize: 13, color: theme.gray500, marginTop: 4 }}>
            {isLogin ? "Welcome back!" : "Create your account"}
          </div>
        </div>

        {/* Toggle */}
        <div style={{ display: "flex", background: theme.gray100, borderRadius: 10, padding: 4, marginBottom: 20 }}>
          <button onClick={() => { setIsLogin(true); setError(""); }} style={{ flex: 1, padding: "8px", border: "none", borderRadius: 8, background: isLogin ? theme.white : "transparent", color: isLogin ? theme.green700 : theme.gray500, fontWeight: isLogin ? 500 : 400, cursor: "pointer", fontFamily: "inherit", fontSize: 13 }}>Login</button>
          <button onClick={() => { setIsLogin(false); setError(""); }} style={{ flex: 1, padding: "8px", border: "none", borderRadius: 8, background: !isLogin ? theme.white : "transparent", color: !isLogin ? theme.green700 : theme.gray500, fontWeight: !isLogin ? 500 : 400, cursor: "pointer", fontFamily: "inherit", fontSize: 13 }}>Register</button>
        </div>

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

          {/* First Name and Last Name - Register only */}
          {!isLogin && (
            <>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: theme.gray800, display: "block", marginBottom: 5 }}>First Name *</label>
                <input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} placeholder="Priya" style={{ width: "100%", border: `1px solid ${theme.gray200}`, borderRadius: 8, padding: "9px 12px", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: theme.gray800, display: "block", marginBottom: 5 }}>Last Name</label>
                <input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} placeholder="Sharma" style={{ width: "100%", border: `1px solid ${theme.gray200}`, borderRadius: 8, padding: "9px 12px", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box" }} />
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: theme.gray800, display: "block", marginBottom: 5 }}>Email *</label>
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" type="email" style={{ width: "100%", border: `1px solid ${theme.gray200}`, borderRadius: 8, padding: "9px 12px", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box" }} />
          </div>

          {/* Password */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: theme.gray800, display: "block", marginBottom: 5 }}>Password *</label>
            <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" type="password" style={{ width: "100%", border: `1px solid ${theme.gray200}`, borderRadius: 8, padding: "9px 12px", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box" }} />
          </div>

          {/* Phone and Role - Register only */}
          {!isLogin && (
            <>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: theme.gray800, display: "block", marginBottom: 5 }}>Phone *</label>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="9876543210" style={{ width: "100%", border: `1px solid ${theme.gray200}`, borderRadius: 8, padding: "9px 12px", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box" }} />
              </div>
              <div>
    <label style={{ fontSize: 12, fontWeight: 500, color: theme.gray800, display: "block", marginBottom: 5 }}>Location *</label>
    <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Nashik, Maharashtra" style={{ width: "100%", border: `1px solid ${theme.gray200}`, borderRadius: 8, padding: "9px 12px", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box" }} />
</div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: theme.gray800, display: "block", marginBottom: 5 }}>I am a *</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {["consumer", "farmer"].map((r) => (
                    <button key={r} onClick={() => setForm({ ...form, role: r })} style={{ flex: 1, padding: "9px", border: `1px solid ${form.role === r ? theme.green700 : theme.gray200}`, borderRadius: 8, background: form.role === r ? theme.green100 : theme.white, color: form.role === r ? theme.green700 : theme.gray500, cursor: "pointer", fontFamily: "inherit", fontSize: 13, textTransform: "capitalize", fontWeight: form.role === r ? 500 : 400 }}>{r}</button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Error or Success message */}
          {error && (
            <div style={{ fontSize: 12, color: error.includes("success") ? theme.green700 : "red", background: error.includes("success") ? theme.green100 : "#fff0f0", padding: "8px 12px", borderRadius: 8, textAlign: "center" }}>
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ background: loading ? theme.gray200 : theme.green700, border: "none", borderRadius: 8, padding: "11px", fontSize: 14, cursor: loading ? "not-allowed" : "pointer", color: loading ? theme.gray500 : theme.white, fontFamily: "inherit", fontWeight: 500, marginTop: 4 }}
          >
            {loading ? "Please wait..." : isLogin ? "Login →" : "Create account →"}
          </button>

        </div>
      </div>
    </div>
  );
}