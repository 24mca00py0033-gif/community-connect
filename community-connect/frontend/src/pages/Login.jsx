import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { HeroArt } from "../components/Illustrations";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="card auth-card" onSubmit={onSubmit}>
        <h2>Welcome back</h2>
        <p className="muted">Login to connect with your community.</p>

        {error && <div className="alert">{error}</div>}

        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={onChange} placeholder="you@example.com" required />

        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={onChange} placeholder="Your password" required />

        <button className="btn" disabled={busy}>{busy ? "Logging in..." : "Login"}</button>

        <p className="muted small center">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </form>

      <HeroArt />
    </div>
  );
}
