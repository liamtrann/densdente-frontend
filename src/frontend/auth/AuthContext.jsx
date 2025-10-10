import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  // very simple: store a boolean + demo user in localStorage
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("dentaparse_auth");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem("dentaparse_auth", JSON.stringify(user));
    else localStorage.removeItem("dentaparse_auth");
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login: (payload) => setUser(payload || { email: "demo@dentaparse.com" }),
      logout: () => setUser(null),
    }),
    [user]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}
