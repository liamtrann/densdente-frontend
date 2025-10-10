// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth shell
import { AuthProvider } from "./frontend/auth/AuthContext";
import RequireAuth from "./frontend/auth/RequireAuth";

// Pages
import Login from "./frontend/pages/auth/Login.jsx";
import Signup from "./frontend/pages/auth/Signup.jsx";
import Admin from "./frontend/pages/Admin.jsx";
import Report from "./frontend/pages/Report.jsx";
import Scheduling from "./frontend/pages/scheduling/Scheduling.jsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes */}
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

          {/* Keep /report public for now */}
          <Route path="/report" element={<Report />} />

          {/* Redirects */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
