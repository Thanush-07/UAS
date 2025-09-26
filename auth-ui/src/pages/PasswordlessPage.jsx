// src/pages/PasswordlessPage.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as api from "../services/api.js";
import { saveToken } from "../services/storage.js";

export default function PasswordlessPage(){
  const [mode, setMode] = useState("request"); // 'request' | 'redeem'
  const [email, setEmail] = useState("");
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();

  useEffect(()=>{
    const token = params.get("token");
    if(token){
      setMode("redeem");
      redeem(token);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function send(){
    setLoading(true); setError(""); setInfo("");
    try{
      await api.sendMagicLink({ email: email.trim() });
      setInfo("Check your inbox for the magic link.");
    }catch(err){
      setError(err?.message || "Failed to send link");
    }finally{ setLoading(false); }
  }

  async function redeem(token){
    setLoading(true); setError(""); setInfo("");
    try{
      const res = await api.redeemMagicLink({ token });
      if(res.token){
        saveToken(res.token);
        window.location.assign("/dashboard");
      }else{
        setError("Invalid or expired link");
      }
    }catch(err){
      setError(err?.message || "Redemption failed");
    }finally{ setLoading(false); }
  }

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Passwordless</h1>
        {mode==="request" && (
          <>
            <p className="subtitle">Receive a one‑time sign‑in link by email.</p>
            {info && <div className="subtitle" style={{color:"var(--success)"}} role="status">{info}</div>}
            {error && <div className="subtitle" style={{color:"var(--error)"}} role="alert">{error}</div>}
            <div className="row" style={{gap:"12px"}}>
              <input type="email" placeholder="name@example.com" value={email}
                     onChange={(e)=> setEmail(e.target.value)} style={inputStyle}/>
              <button onClick={send} disabled={loading || !email} style={buttonStyle}>
                {loading ? "Sending..." : "Send link"}
              </button>
            </div>
          </>
        )}
        {mode==="redeem" && (
          <>
            <p className="subtitle">Redeeming link, please wait…</p>
            {error && <div className="subtitle" style={{color:"var(--error)"}} role="alert">{error}</div>}
          </>
        )}
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
