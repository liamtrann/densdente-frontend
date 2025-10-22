// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth
import { AuthProvider } from "./auth/AuthContext";
import RequireAuth from "./auth/RequireAuth";

// Pages (pick either individual imports OR your pages index re-exports)
import Login from "./pages/authorize/Login.jsx";
import Password from "./pages/authorize/Password.jsx"; // remove if you don't want this route
import Admin from "./pages/admin/Admin.jsx";
import Scheduling from "./pages/scheduling/Scheduling.jsx";
import Report from "./pages/Report.jsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/password" element={<Password />} /> {/* delete if unused */}
          <Route path="/report" element={<Report />} />

          {/* Protected */}
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <Admin />
              </RequireAuth>
            }
          />
          <Route
            path="/scheduling"
            element={
              <RequireAuth>
                <Scheduling />
              </RequireAuth>
            }
          />

          {/* Redirects */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
