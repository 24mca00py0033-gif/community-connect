import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { HeroArt } from "../components/Illustrations";

export default function Register() {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await register(form.name, form.email, form.password);
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
        <h2>Create your account</h2>
        <p className="muted">Join the Community Connect network.</p>

        {error && <div className="alert">{error}</div>}

        <label>Name</label>
        <input name="name" value={form.name} onChange={onChange} placeholder="Your name" required />

        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={onChange} placeholder="you@example.com" required />

        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={onChange} placeholder="At least 6 characters" minLength={6} required />

        <button className="btn" disabled={busy}>{busy ? "Creating..." : "Register"}</button>

        <p className="muted small center">
          Already a member? <Link to="/login">Login</Link>
        </p>
      </form>

      <HeroArt />
    </div>
  );
}
