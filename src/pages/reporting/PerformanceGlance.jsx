// src/pages/reporting/PerformanceGlance.jsx
import { useMemo, useState } from "react";
import { Card, DataTable } from "../../common";

export default function PerformanceGlance() {
  const [month, setMonth] = useState(() => {
    const d = new Date();
    // format YYYY-MM for <input type="month">
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });
  const [showPractitioners, setShowPractitioners] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Empty data to match your mock (no rows yet)
  const data = [];
  const columns = useMemo(
    () => [
      { key: "date", header: "DATE" },
      { key: "collection", header: "COLLECTION" },
      { key: "costs", header: "TOTAL COSTS" },
      { key: "production", header: "PRODUCTION" },
    ],
    []
  );

  return (
    <Card className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Performance at a Glance</h2>

        <div className="flex items-center gap-4">
          <input
            type="month"
            className="w-[170px] rounded-xl border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              className="accent-indigo-600"
              checked={showPractitioners}
              onChange={(e) => setShowPractitioners(e.target.checked)}
            />
            Show Practitioner Breakdown
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              className="accent-indigo-600"
              checked={showBreakdown}
              onChange={(e) => setShowBreakdown(e.target.checked)}
            />
            Show Cost & Collection Breakdown
          </label>
        </div>
      </div>

      {/* Table shell (empty rows for now) */}
      <Card className="shadow-none" bodyClassName="p-0">
        <DataTable columns={columns} data={data} rowKey={(r, i) => i} />
      </Card>
    </Card>
  );
}
