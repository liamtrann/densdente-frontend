// src/frontend/pages/admin/Downloads.jsx
import { useMemo } from "react";
import { Card, Button } from "../../common";

export default function Downloads() {
  const today = useMemo(() => new Date().toLocaleDateString("en-CA"), []);

  const rows = [
    { id: "hist-perf", label: "Historical Performance Report (Before July)" },
    { id: "forecast", label: "Forecast Report" },
    { id: "new-patient", label: "New Patient Report" },
    { id: "new-performance", label: "New Performance Report" },
  ];

  function handleDownload(id) {
    // TODO: wire up to backend/export; for now this is a stub
    console.log("Download clicked:", id);
  }

  return (
    <Card title="Download Reports" className="mt-2">
      {/* helper text + date chip */}
      <div className="text-center text-gray-700 mb-6">
        <p className="mb-3">
          Please select a date range to download reports for:
        </p>
        <div className="inline-flex items-center rounded-xl border border-gray-200 px-4 py-2 bg-white shadow-sm text-gray-700">
          {today} – {today}
        </div>
      </div>

      {/* list */}
      <div className="divide-y divide-indigo-50 rounded-2xl overflow-hidden bg-indigo-50/20">
        {rows.map((r) => (
          <div
            key={r.id}
            className="flex items-center justify-between bg-white mx-4 my-3 rounded-xl px-5 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
          >
            <div className="text-[15px] font-semibold text-gray-900">
              {r.label}
            </div>

            <Button
              onClick={() => handleDownload(r.id)}
              className="rounded-full bg-indigo-600 text-white px-5 py-2 font-semibold hover:bg-indigo-700"
            >
              Download
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
