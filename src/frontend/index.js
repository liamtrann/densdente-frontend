// Re-export shared UI
export * from "./common";

// Re-export pages (Admin, Scheduling, etc.)
export * from "./pages";

// Auth context & guard
export { AuthProvider, useAuth } from "./auth/AuthContext";
export { default as RequireAuth } from "./auth/RequireAuth";
