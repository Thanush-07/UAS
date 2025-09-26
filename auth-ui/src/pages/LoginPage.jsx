// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

async function authenticate({ username, password }) {
  const res = await fetch(`${BASE}/api/user/authenticate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || "Login failed");
  return data; // { token } or { mfaRequired/anomaly, tid }
}

export default function LoginPage(){
  const nav = useNavigate();
  const loc = useLocation();
  const [form, setForm] = useState({ username:"", password:"" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = e => setForm(s => ({...s, [e.target.name]: e.target.value}));

  const onSubmit = async (e)=>{
    e.preventDefault();
    setError(""); setLoading(true);
    try{
      const resp = await authenticate({ username: form.username.trim(), password: form.password });
      if (resp.mfaRequired || resp.anomaly || resp.tid){
        const tid = resp.tid || resp.tempId || "";
        nav(`/mfa?tid=${encodeURIComponent(tid)}`, { replace:true });
        return;
      }
      if (resp.token){
        localStorage.setItem("token", resp.token);
        nav(loc.state?.from || "/dashboard", { replace:true });
        return;
      }
      setError("Additional verification required");
    }catch(err){
      // Keep UI visible even on errors
      setError(err.message || "Unable to sign in");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.banner}>Login mounted</div>
        <h1 style={styles.title}>Welcome back</h1>
        <p style={styles.subtitle}>Sign in to continue</p>
        {error && <div role="alert" style={{...styles.subtitle, color:"#ff5d5d"}}>{error}</div>}
        <form onSubmit={onSubmit} style={{display:"grid", gap:16}}>
          <label style={styles.label}>
            <span>Username</span>
            <input name="username" value={form.username} onChange={onChange}
                   placeholder="johndoe" autoComplete="username" style={styles.input}/>
          </label>
          <label style={styles.label}>
            <span>Password</span>
            <input type="password" name="password" value={form.password} onChange={onChange}
                   placeholder="••••••••" autoComplete="current-password" style={styles.input}/>
          </label>
          <button disabled={loading} style={styles.button}>{loading ? "Signing in..." : "Sign in"}</button>
        </form>
        <hr style={styles.hr}/>
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <Link to="/passwordless" style={styles.link}>Use magic link</Link>
          <Link to="/register" style={styles.link}>Create account</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container:{minHeight:"100vh",display:"grid",placeItems:"center",padding:36,
    background:"radial-gradient(1200px 800px at 20% 10%, #1a1f4b 0%, #0f1226 60%)",color:"#e7e9f3"},
  card:{width:"min(480px,92vw)",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.10)",
    backdropFilter:"blur(20px)",borderRadius:14,padding:36,boxShadow:"0 10px 30px rgba(0,0,0,0.35)"},
  banner:{padding:"6px 10px",marginBottom:12,background:"#2d6a4f",borderRadius:8,fontSize:12},
  title:{margin:"0 0 16px",font:"600 28px/1.2 system-ui, sans-serif"},
  subtitle:{margin:"0 0 16px",color:"#aab0c6",fontSize:14},
  label:{display:"grid",gap:6,fontSize:14},
  input:{width:"100%",padding:"12px 14px",borderRadius:12,background:"rgba(255,255,255,0.06)",
    border:"1px solid rgba(255,255,255,0.10)",color:"#e7e9f3",outline:"none"},
  button:{padding:"12px 16px",borderRadius:12,border:"none",background:"#6c8cff",color:"#fff",cursor:"pointer"},
  link:{color:"#6c8cff",textDecoration:"none"},
  hr:{border:0,borderTop:"1px solid rgba(255,255,255,0.10)",margin:"24px 0"}
};
