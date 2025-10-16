import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("dp_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem("dp_user", JSON.stringify(user));
    else localStorage.removeItem("dp_user");
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      login: (u) => setUser(u),
      logout: () => setUser(null),
      isAuthed: !!user,
    }),
    [user]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

// simple guard component if you ever need inline guarding
export function Guard({ children }) {
  const { isAuthed } = useAuth();
  const loc = useLocation();
  if (!isAuthed) return <Navigate to="/login" replace state={{ from: loc }} />;
  return children;
}
