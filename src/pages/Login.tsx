import { useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import "../styles/style.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (!error) navigate("/dashboard");
    else alert(error.message);
  };

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
      autoComplete="off"
    >
      <div className="form-inner">
        <h2>User Login</h2>

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
              data-lpignore="true"
            />
          </div>
        </div>

        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <div className="input-group">
            <span className="icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 10v8h12v-8h-2V9a4 4 0 1 0-8 0v1H6zM8 9a2 2 0 1 1 4 0v1H8V9z" />
              </svg>
            </span>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-lpignore="true"
            />
          </div>
        </div>

        <div
          className="btn-group"
          style={{ display: "flex", justifyContent: "flex-start", gap: "12px" }}
        >
          <button type="submit" className="btn btn--primary" disabled={loading}>
            {loading ? "Logging in..." : "Sign in"}
          </button>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
}
