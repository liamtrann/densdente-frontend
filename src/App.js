import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Admin from "./frontend/pages/Admin.jsx";
import Report from "./frontend/pages/Report.jsx";
import Scheduling from "./frontend/pages/scheduling/Scheduling.jsx";

function Home() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Dentaparse</h1>
      <p>Home page</p>
      {/* Dev-only quick links */}
      <nav style={{ marginTop: 16 }}>
        <Link to="/admin" style={{ marginRight: 12 }}>Admin</Link>
        <Link to="/report">Report</Link>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/report" element={<Report />} />
        {/* optional: redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />

        <Route path="/scheduling" element={<Scheduling />} />
      </Routes>
    </BrowserRouter>
  );
}
