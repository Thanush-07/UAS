// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as api from "../services/api.js";
import { saveToken } from "../services/storage.js";
import QRCode from "qrcode.react";

export default function RegisterPage(){
  const nav = useNavigate();
  const [form, setForm] = useState({ username:"", email:"", password:"", mfaOptIn:true });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mfaOtpAuthUrl, setMfaOtpAuthUrl] = useState("");

  const onChange = e => setForm(s => ({...s, [e.target.name]: e.target.type==="checkbox" ? e.target.checked : e.target.value}));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try{
      const res = await api.register({
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
        mfaOptIn: form.mfaOptIn
      });
      if(res.mfa && res.mfa.otpauthUrl){
        setMfaOtpAuthUrl(res.mfa.otpauthUrl);
      }
      // optional: if backend auto-signs-in after register, store token then go dashboard
      if(res.token){
        saveToken(res.token);
        window.location.assign("/dashboard");
        return;
      }
      setTimeout(()=> nav("/login", { replace:true }), 1200);
    } catch(err){
      setError(err?.message || "Registration failed");
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Create account</h1>
        <p className="subtitle">Sign up to continue to the secure dashboard.</p>
        {error && <div className="subtitle" style={{color:"var(--error)"}} role="alert">{error}</div>}
        <form onSubmit={onSubmit} className="col">
          <div style={{display:"grid", gap:"16px"}}>
            <label>
              <div>Username</div>
              <input required name="username" value={form.username} onChange={onChange}
                     autoComplete="username" placeholder="johndoe"
                     style={inputStyle}/>
            </label>
            <label>
              <div>Email</div>
              <input required type="email" name="email" value={form.email} onChange={onChange}
                     autoComplete="email" placeholder="name@example.com"
                     style={inputStyle}/>
            </label>
            <label>
              <div>Password</div>
              <input required type="password" name="password" value={form.password} onChange={onChange}
                     autoComplete="new-password" placeholder="••••••••"
                     style={inputStyle}/>
            </label>
            <label className="row" style={{justifyContent:"space-between"}}>
              <span>Enable MFA (recommended)</span>
              <input type="checkbox" name="mfaOptIn" checked={form.mfaOptIn} onChange={onChange}/>
            </label>
            <button disabled={loading} style={buttonStyle}>{loading ? "Creating..." : "Create account"}</button>
          </div>
        </form>

        {mfaOtpAuthUrl && (
          <>
            <hr/>
            <p className="subtitle">Scan this QR in Google Authenticator or a compatible TOTP app.</p>
            <div className="row" style={{justifyContent:"center"}}>
              <div style={{padding:"12px", background:"var(--card)", borderRadius:"12px"}}>
                <QRCode value={mfaOtpAuthUrl} size={160} />
              </div>
            </div>
          </>
        )}

        <hr/>
        <div className="row" style={{justifyContent:"space-between"}}>
          <span className="subtitle">Already have an account?</span>
          <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width:"100%", padding:"12px 14px", borderRadius:"12px",
  background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.10)",
  color:"var(--text)", outline:"none"
};
const buttonStyle = {
  padding:"12px 16px", borderRadius:"12px", border:"none",
  background:"var(--primary)", color:"#fff", cursor:"pointer"
};
