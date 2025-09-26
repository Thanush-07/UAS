// src/pages/MFAPage.jsx
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as api from "../services/api.js";
import { saveToken } from "../services/storage.js";

export default function MFAPage(){
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [params] = useSearchParams();
  const nav = useNavigate();
  const tid = params.get("tid") || "";

  const onSubmit = async (e)=>{
    e.preventDefault();
    setError(""); setLoading(true);
    try{
      const res = await api.verifyMfa({ tid, code: code.trim() });
      if(res.token){
        saveToken(res.token);
        window.location.assign("/dashboard");
      }else{
        setError("Verification failed");
      }
    }catch(err){
      setError(err?.message || "Invalid or expired code");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Verify code</h1>
        <p className="subtitle">Enter the 6‑digit code from the authenticator app.</p>
        {error && <div className="subtitle" style={{color:"var(--error)"}} role="alert">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="row" style={{gap:"12px"}}>
            <input inputMode="numeric" pattern="[0-9]*" maxLength={6} required
                   value={code} onChange={(e)=> setCode(e.target.value)}
                   placeholder="123456" style={inputStyle}/>
            <button disabled={loading} style={buttonStyle}>{loading ? "Verifying..." : "Verify"}</button>
          </div>
        </form>
        <hr/>
        <button onClick={()=> nav("/login")} className="link">Back to login</button>
      </div>
    </div>
  );
}

const inputStyle = {
  width:"100%", padding:"12px 14px", borderRadius:"12px",
  background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.10)",
  color:"var(--text)", outline:"none", letterSpacing:"2px", textAlign:"center"
};
const buttonStyle = {
  padding:"12px 16px", borderRadius:"12px", border:"none",
  background:"var(--primary)", color:"#fff", cursor:"pointer"
};
