// src/pages/DashboardPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../services/storage.js";

export default function DashboardPage(){
  const nav = useNavigate();
  function signOut(){
    clearToken();
    window.location.assign("/login");
  }
  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Dashboard</h1>
        <p className="subtitle">You are authenticated with a valid token.</p>
        <div className="row" style={{justifyContent:"flex-end"}}>
          <button onClick={signOut} style={buttonStyle}>Sign out</button>
        </div>
      </div>
    </div>
  );
}
const buttonStyle = {
  padding:"12px 16px", borderRadius:"12px", border:"none",
  background:"var(--primary)", color:"#fff", cursor:"pointer"
};
