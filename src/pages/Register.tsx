import { useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import "../styles/style.scss";

export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (!email.trim() || !name.trim() || !phone.trim()) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { data: { name: name.trim(), phone: phone.trim() } },
    });
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <form className="form" onSubmit={(e) => e.preventDefault()} autoComplete="off">
      <div className="form-inner">
        <h2>Create Account</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <div className="input-wrapper">
          <label htmlFor="name">Full Name</label>
          <div className="input-group">
            <span className="icon">
              <svg viewBox="0 0 24 24"><path d="M12 4a4 4 0 110 8 4 4 0 010-8zm0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z"/></svg>
            </span>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="input-wrapper">
  <label htmlFor="phone">Phone</label>
  <div className="input-group">
    <span className="icon">
      <svg viewBox="0 0 24 24"><path d="M6.62 10.79a15.91 15.91 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27 12.07 12.07 0 004.24.81 1 1 0 011 1v3.6a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.6a1 1 0 011 1 12.07 12.07 0 00.81 4.24 1 1 0 01-.27 1.11l-2.2 2.2z"/></svg>
    </span>
    <input
      type="tel"
      id="phone"
      value={phone}
      onChange={(e) => {
        const input = e.target.value;
        // Allow only digits
        if (/^\d*$/.test(input)) setPhone(input);
      }}
      inputMode="numeric"
      pattern="[0-9]*"
      maxLength={15}
    />
  </div>
</div>


        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <div className="input-group">
            <span className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m0 0L12 13.5l9.75-6.75M3 6.75l9.75 6.75 9.75-6.75" />
              </svg>
            </span>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <div className="input-group">
            <span className="icon">
              <svg viewBox="0 0 24 24"><path d="M12 17a2 2 0 100-4 2 2 0 000 4zm6-10h-1V6a5 5 0 00-10 0v1H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2zM8 6a4 4 0 118 0v1H8V6z"/></svg>
            </span>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="input-wrapper">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="input-group">
            <span className="icon">
              <svg viewBox="0 0 24 24"><path d="M12 17a2 2 0 100-4 2 2 0 000 4zm6-10h-1V6a5 5 0 00-10 0v1H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2zM8 6a4 4 0 118 0v1H8V6z"/></svg>
            </span>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="btn-group" style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            className="btn btn--primary"
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <button
            type="button"
            className="btn btn--primary"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
}
