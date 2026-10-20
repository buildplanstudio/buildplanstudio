import { createContext, useContext, useEffect, useState } from "react";
import { api, getToken } from "../api/client.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!getToken());

  useEffect(() => {
    if (!getToken()) return;
    api
      .me()
      .then((r) => setUser(r.user))
      .catch(() => localStorage.removeItem("bps_token"))
      .finally(() => setLoading(false));
  }, []);

  function saveSession({ token, user }) {
    localStorage.setItem("bps_token", token);
    setUser(user);
  }

  async function login(email, password) {
    saveSession(await api.login({ email, password }));
  }

  async function signup(form) {
    saveSession(await api.signup(form));
  }

  function logout() {
    localStorage.removeItem("bps_token");
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, loading, login, signup, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
