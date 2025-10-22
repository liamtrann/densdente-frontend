// src/frontend/pages/admin/PerformancePatients.jsx
import { useMemo, useState } from "react";
import { Card, DataTable, Pagination } from "../../common";

const perfRows = [
  {
    clinic: "ON-W-OSW",
    collection: 42150,
    totalCosts: 26500,
    production: 53800,
  },
  {
    clinic: "ON-T-OSK",
    collection: 38200,
    totalCosts: 24400,
    production: 49210,
  },
  {
    clinic: "NS-H-LAC",
    collection: 21040,
    totalCosts: 16220,
    production: 30110,
  },
];

const patientsRows = [
  {
    clinic: "ON-W-OSW",
    name: "Shaldon Jennings",
    category: "Other",
    lead: "Dr. Marvin Gretzinger",
  },
  {
    clinic: "ON-W-OSW",
    name: "Sarah Witmer",
    category: "Other",
    lead: "Dr. Michael Liu",
  },
  {
    clinic: "ON-W-OSW",
    name: "Sarah Scott",
    category: "Other",
    lead: "Dr. Daniel Park",
  },
  {
    clinic: "ON-W-OSW",
    name: "George Stokes",
    category: "Other",
    lead: "Dr. Michael Kalbfleisch",
  },
  {
    clinic: "ON-W-OSW",
    name: "Finn Mccone",
    category: "Other",
    lead: "Dr. Jacqueline Sieber",
  },
  // add more rows as needed…
];

export default function PerformancePatients() {
  // right-side checkboxes
  const [showPract, setShowPract] = useState(false);
  const [showCosts, setShowCosts] = useState(false);

  // ---- Patients pagination state ----
  const [npPage, setNpPage] = useState(1); // 1-based
  const [npPageSize, setNpPageSize] = useState(10);

  // derive paged patients
  const npTotal = patientsRows.length;
  const npStart = (npPage - 1) * npPageSize;
  const npData = patientsRows.slice(npStart, npStart + npPageSize);

  const perfCols = useMemo(() => {
    const base = [
      { key: "clinic", header: "CLINIC", width: 180, nowrap: true },
      {
        key: "collection",
        header: "COLLECTION",
        align: "left",
        render: (r) => currency(r.collection),
      },
      {
        key: "totalCosts",
        header: "TOTAL COSTS",
        align: "left",
        render: (r) => currency(r.totalCosts),
      },
      {
        key: "production",
        header: "PRODUCTION",
        align: "left",
        render: (r) => currency(r.production),
      },
    ];
    // You can branch on showPract/showCosts here to add extra breakdown columns.
    return base;
  }, [showPract, showCosts]);

  const patientCols = [
    { key: "clinic", header: "CLINIC", width: 180, nowrap: true },
    { key: "name", header: "PATIENT NAME" },
    { key: "category", header: "LEAD CATEGORY", width: 140 },
    { key: "lead", header: "LEAD DESCRIPTION" },
  ];

  return (
    <>
      {/* Performance at a Glance */}
      <Card
        title="Performance at a Glance"
        right={
          <div className="flex items-center gap-6 text-sm text-gray-700">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded border-gray-300"
                checked={showPract}
                onChange={(e) => setShowPract(e.target.checked)}
              />
              <span>Show Practitioner Breakdown</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded border-gray-300"
                checked={showCosts}
                onChange={(e) => setShowCosts(e.target.checked)}
              />
              <span>Show Cost & Collection Breakdown</span>
            </label>
          </div>
        }
        className="mb-5"
      >
        <DataTable
          columns={perfCols}
          data={perfRows}
          rowKey={(r) => r.clinic}
        />
      </Card>

      {/* New Patients at a Glance */}
      <Card
        title="New Patients at a Glance"
        className="mt-6"
        bodyClassName="p-0"
      >
        <DataTable
          columns={patientCols}
          data={npData}
          rowKey={(r, i) => `${r.clinic}-${i}`}
        />

        {/* Bottom pager (matches your screenshot) */}
        <div className="px-4 pb-4">
          <Pagination
            page={npPage}
            pageSize={npPageSize}
            total={npTotal}
            onPageChange={setNpPage}
            onPageSizeChange={(n) => {
              setNpPage(1);
              setNpPageSize(n);
            }}
          />
        </div>
      </Card>
    </>
  );
}

function currency(n) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(n);
}
