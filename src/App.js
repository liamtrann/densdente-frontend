// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, RequireAuth } from "./frontend"; // from the top-level barrel
import { Login, Signup, Admin, Report, Scheduling } from "./frontend/pages";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

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

          <Route path="/report" element={<Report />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
