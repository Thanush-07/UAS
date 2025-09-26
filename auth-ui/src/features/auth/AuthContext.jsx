// src/features/auth/AuthContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { saveToken, getToken, clearToken } from "../../services/storage.js";
import * as api from "../../services/api.js";

const AuthCtx = createContext(null);

export function AuthProvider({children}){
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{ if(token){ setUser(api.decodeUser(token)); } }, [token]);

  const value = useMemo(()=>({
    token, user, loading,
    login: async (credentials) => {
      setLoading(true);
      try{
        const res = await api.login(credentials);
        saveToken(res.token);
        setToken(res.token);
        setUser(api.decodeUser(res.token));
        return res;
      } finally { setLoading(false); }
    },
    logout: async () => {
      try{ await api.logout(); }catch(_){}
      clearToken(); setUser(null); setToken(null);
    }
  }), [token, user, loading]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth(){ return useContext(AuthCtx); }
