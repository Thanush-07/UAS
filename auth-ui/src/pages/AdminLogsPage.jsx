// src/pages/AdminLogsPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { socket } from "../services/socket.js";

export default function AdminLogsPage(){
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(()=>{
    socket.connect();
    const onEvent = (evt) => setEvents(s => [evt, ...s].slice(0, 500));
    socket.on("auth_event", onEvent);
    return () => {
      socket.off("auth_event", onEvent);
      socket.disconnect();
    };
  }, []);

  const filtered = useMemo(()=>{
    const q = filter.toLowerCase();
    return !q ? events : events.filter(e =>
      (e.event_type||"").toLowerCase().includes(q) ||
      (e.ip||"").toLowerCase().includes(q) ||
      (e.username||"").toLowerCase().includes(q)
    );
  }, [events, filter]);

  return (
    <div className="container">
      <div className="card" style={{width:"min(960px, 96vw)"}}>
        <h1 className="title">Admin logs</h1>
        <div className="row" style={{marginBottom:"12px"}}>
          <input placeholder="Filter by event, IP or username…" value={filter}
                 onChange={(e)=> setFilter(e.target.value)} style={inputStyle}/>
        </div>
        <div style={{maxHeight:"60vh", overflow:"auto", borderRadius:"12px", border:"1px solid rgba(255,255,255,0.10)"}}>
          <table style={{width:"100%", borderCollapse:"collapse"}}>
            <thead>
              <tr style={{background:"rgba(255,255,255,0.04)"}}>
                <th style={th}>Time</th>
                <th style={th}>Event</th>
                <th style={th}>User</th>
                <th style={th}>IP</th>
                <th style={th}>Details</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e, idx)=>(
                <tr key={idx} style={{borderTop:"1px solid rgba(255,255,255,0.06)"}}>
                  <td style={td}>{new Date(e.timestamp || Date.now()).toLocaleString()}</td>
                  <td style={td}>{e.event_type}</td>
                  <td style={td}>{e.username || "-"}</td>
                  <td style={td}>{e.ip || "-"}</td>
                  <td style={td}><code style={{fontSize:"12px"}}>{e.details ? JSON.stringify(e.details) : "-"}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
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
const th = { textAlign:"left", padding:"10px 12px", fontWeight:600 };
const td = { padding:"10px 12px", verticalAlign:"top" };
