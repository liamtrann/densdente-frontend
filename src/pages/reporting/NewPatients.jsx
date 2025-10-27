// src/pages/reporting/NewPatients.jsx
import { useMemo, useState } from "react";
import { Button, Card, FormField, DataTable, Pagination } from "../../common";

/* You can extend/replace these with real values later */
const LEAD_CATEGORIES = [
  "Email Blast/Marketing",
  "Referral",
  "Walk-in",
  "Google Ads",
  "Social Media",
  "Website",
  "Other",
];

/* --- Demo data for Previous Reports table ---------------------------- */
const DEMO_REPORTS = [
  {
    id: 1,
    date: "2025-10-05",
    name: "Shaldon Jennings",
    leadCat: "Other",
    leadDesc: "Dr. Marvin Gretzinger",
  },
  {
    id: 2,
    date: "2025-10-08",
    name: "Sarah Witmer",
    leadCat: "Other",
    leadDesc: "Dr. Michael Liu",
  },
  {
    id: 3,
    date: "2025-10-11",
    name: "Sarah Scott",
    leadCat: "Other",
    leadDesc: "Dr. Daniel Park",
  },
  {
    id: 4,
    date: "2025-10-13",
    name: "George Stokes",
    leadCat: "Other",
    leadDesc: "Dr. Michael Kalbfleisch",
  },
  {
    id: 5,
    date: "2025-10-14",
    name: "Finn Mccone",
    leadCat: "Other",
    leadDesc: "Dr. Jacqueline Sieber",
  },
  {
    id: 6,
    date: "2025-09-28",
    name: "Shweta Satyan",
    leadCat: "Other",
    leadDesc: "Dr. Holman Yu",
  },
  {
    id: 7,
    date: "2025-09-30",
    name: "Ryan Mervyn",
    leadCat: "Other",
    leadDesc: "Dr. Danielle Albert",
  },
];

export default function NewPatients({ date: parentDate }) {
  /* ========== Form state (top card) ================================= */
  const [date, setDate] = useState(
    parentDate || new Date().toISOString().slice(0, 10)
  );
  const [patientName, setPatientName] = useState("");
  const [leadCategory, setLeadCategory] = useState(LEAD_CATEGORIES[0]);

  const canSubmit = patientName.trim().length > 0;

  function onSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    // TODO: replace with real API save
    console.log("NEW PATIENT (demo payload)", {
      date,
      patientName: patientName.trim(),
      leadCategory,
    });
    alert("New patient submitted (demo). Check console for payload.");

    setPatientName("");
    setLeadCategory(LEAD_CATEGORIES[0]);
  }

  /* ========== Previous Reports (bottom card) ======================== */
  // month filter value like "2025-10"
  const [month, setMonth] = useState(() =>
    new Date().toISOString().slice(0, 7)
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = useMemo(() => {
    // filter by "YYYY-MM"
    return DEMO_REPORTS.filter((r) => r.date.slice(0, 7) === month);
  }, [month]);

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const data = filtered.slice(start, start + pageSize);

  function onEdit(row) {
    alert(`Edit (demo): ${row.name} — ${row.date}`);
  }
  function onDelete(row) {
    if (window.confirm(`Delete (demo) ${row.name}?`)) {
      alert("Deleted (demo only). Wire up your real delete here.");
    }
  }

  const columns = [
    {
      key: "date",
      header: "Date",
      width: 140,
      render: (r) => {
        const d = new Date(r.date);
        return d.toLocaleDateString("en-CA"); // YYYY-MM-DD
      },
    },
    { key: "name", header: "Name" },
    { key: "leadCat", header: "Lead Category" },
    { key: "leadDesc", header: "Lead Description" },
    {
      header: "Actions",
      align: "right",
      nowrap: true,
      render: (row) => (
        <div className="flex justify-end gap-2">
          <Button
            size="sm"
            variant="outline"
            className="rounded-full"
            onClick={() => onEdit(row)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="danger"
            className="rounded-full"
            onClick={() => onDelete(row)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Patient Information Form */}
      <Card className="mt-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">Patient Information Form</h2>
          <input
            type="date"
            className="w-[200px] rounded-xl border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <form onSubmit={onSubmit} className="max-w-2xl">
          <div className="mb-5">
            <FormField
              label="Patient Name"
              placeholder="Patient name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
              showError={false}
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">
              Lead Category
            </label>
            <select
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-200"
              value={leadCategory}
              onChange={(e) => setLeadCategory(e.target.value)}
            >
              {LEAD_CATEGORIES.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <Button
            as="button"
            type="submit"
            disabled={!canSubmit}
            className="rounded-full px-8 py-3 font-semibold text-white w-full
                       bg-gradient-to-r from-emerald-400 to-emerald-500
                       hover:from-emerald-500 hover:to-emerald-600 disabled:opacity-40"
          >
            Submit
          </Button>
        </form>
      </Card>

      {/* Previous Reports */}
      <Card
        className="mt-6"
        title="Previous Reports"
        right={
          <input
            type="month"
            value={month}
            onChange={(e) => {
              setPage(1);
              setMonth(e.target.value);
            }}
            className="w-[180px] rounded-xl border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
          />
        }
        bodyClassName="p-0"
      >
        <DataTable columns={columns} data={data} rowKey={(r) => r.id} />
        <Pagination
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={setPage}
          onPageSizeChange={(n) => {
            setPage(1);
            setPageSize(n);
          }}
        />
      </Card>
    </>
  );
}
