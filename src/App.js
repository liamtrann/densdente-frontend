import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import auth from the actual files
import { AuthProvider } from "./auth/AuthContext";
import RequireAuth from "./auth/RequireAuth";

// Pull all pages from the pages barrel
import { Admin, Scheduling, Login, Password, Reporting } from "./pages";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/password" element={<Password />} />

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

          {/* NEW reporting route */}
          <Route
            path="/reporting/:clinicId"
            element={
              <RequireAuth>
                <Reporting />
              </RequireAuth>
            }
          />

          {/* remove /report unless you still have that page */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
