// src/frontend/pages/scheduling/Scheduling.jsx
import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumbs,
  Button,
  Card,
  Pagination,
  DataTable,
  LogoutButton,
  Page,
  Tabs,
} from "../../common";

const allRows = [
  {
    clinic: "ON-T-TIL",
    first: "Abby",
    last: "Hudson",
    role: "HYG",
    status: "Active",
  },
  {
    clinic: "ON-C-CWL",
    first: "Adele",
    last: "Harner",
    role: "HYG",
    status: "Active",
  },
  {
    clinic: "QC-M-TRE",
    first: "Alber",
    last: "Tawfik",
    role: "HYG",
    status: "Active",
  },
  {
    clinic: "MB-W-SOU",
    first: "Alexandra",
    last: "Crescini",
    role: "HYG",
    status: "Active",
  },
  {
    clinic: "ON-S-ARD",
    first: "Alexandra",
    last: "Bachert",
    role: "HYG",
    status: "Active",
  },
  {
    clinic: "ON-T-COL",
    first: "Alina",
    last: "Maga",
    role: "HYG",
    status: "Active",
  },
  {
    clinic: "NS-H-LAC",
    first: "Amanda",
    last: "Mcmullin",
    role: "HYG",
    status: "Active",
  },
  {
    clinic: "ON-G-GRA",
    first: "Amanda",
    last: "Fogal",
    role: "HYG",
    status: "Active",
  },
  {
    clinic: "ON-C-ART",
    first: "Amber",
    last: "Mcmonagle",
    role: "HYG",
    status: "Active",
  },
  {
    clinic: "ON-T-EVD",
    first: "Amin",
    last: "Hirl",
    role: "HYG",
    status: "Active",
  },
];

export default function Scheduling() {
  const [tab, setTab] = useState("practitioners");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = useMemo(
    () =>
      allRows.filter((r) =>
        `${r.clinic} ${r.first} ${r.last}`
          .toLowerCase()
          .includes(q.toLowerCase())
      ),
    [q]
  );
  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const data = filtered.slice(start, start + pageSize);

  const columns = [
    { key: "clinic", header: "Clinic", width: 160, nowrap: true },
    { key: "first", header: "First Name" },
    { key: "last", header: "Last Name" },
    { key: "role", header: "DDS/HYG", width: 110, nowrap: true },
    { key: "status", header: "Status", width: 120, nowrap: true },
    {
      header: "Actions",
      align: "right",
      nowrap: true,
      render: () => (
        <Button
          size="sm"
          variant="primary"
          className="rounded-full px-4 py-1.5 bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Edit
        </Button>
      ),
    },
  ];

  // Upload handlers
  const fileInputRef = useRef(null);
  const templateHref = "/templates/practitioner_upload_template.xlsx"; // place file in /public/templates

  function triggerUpload() {
    fileInputRef.current?.click();
  }
  function onFileSelected(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const ok =
      file.name.endsWith(".xlsx") ||
      file.name.endsWith(".xls") ||
      file.name.endsWith(".csv");
    if (!ok) {
      alert("Please select a .xlsx, .xls, or .csv file.");
      e.target.value = "";
      return;
    }
    // TODO: send to backend
    alert(`Selected: ${file.name}`);
    e.target.value = "";
  }

  return (
    <Page>
      {/* Topbar */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <Breadcrumbs
            items={[{ label: "Pages" }, { label: "Scheduling Dashboard" }]}
          />
          <h1 className="mt-2 text-[32px] leading-tight font-extrabold">
            Scheduling Dashboard
          </h1>
        </div>
        <div className="flex gap-3">
          <Button as={Link} to="/admin" variant="outline">
            Back to Admin Dashboard
          </Button>
          <LogoutButton />
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={setTab}
        items={[
          { key: "practitioners", label: "Practitioners" },
          { key: "upload", label: "Upload Practitioners" },
        ]}
      />

      {/* Practitioners list */}
      {tab === "practitioners" && (
        <Card title="Practitioners">
          <p className="text-gray-500 -mt-1 mb-3">
            View and manage clinic practitioners below.
          </p>

          <input
            value={q}
            onChange={(e) => {
              setPage(1);
              setQ(e.target.value);
            }}
            placeholder="Search for Practitioners by Clinic or Name..."
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 bg-white outline-none focus:ring-2 focus:ring-indigo-200"
          />

          <div className="mt-4" />

          <Card bodyClassName="p-0" className="shadow-none">
            <DataTable
              columns={columns}
              data={data}
              rowKey={(r, i) => `${r.clinic}-${i}`}
            />
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
        </Card>
      )}

      {/* Upload Practitioners */}
      {tab === "upload" && (
        <Card className="rounded-2xl shadow-md bg-indigo-50 border border-indigo-100">
          <h3 className="text-[18px] font-bold mb-2 text-indigo-900">
            Add New Practitioners
          </h3>

          <p className="text-indigo-900/80">
            To add new practitioners, download our Excel template, fill it out
            following the same columns, and upload it.
          </p>

          {/* Download button (blue pill) */}
          <div className="mt-5 mb-2 flex justify-center">
            <Button
              as="a"
              href={templateHref}
              download
              variant="primary"
              className="rounded-full px-5 py-2.5 shadow-sm bg-indigo-600 text-white hover:bg-indigo-700 inline-flex items-center gap-2"
            >
              <span className="-mt-[1px]">⬇️</span>
              <span>Download Template</span>
            </Button>
          </div>

          {/* Divider */}
          <div className="my-5 border-t border-indigo-200/60" />

          {/* Helper line */}
          <p className="text-center text-indigo-900/80 mb-4">
            After filling out the template, click the button below to upload the
            file. Please ensure to follow the template format.
          </p>

          {/* Upload button (blue pill) */}
          <div className="flex justify-center">
            <Button
              variant="primary"
              className="rounded-full px-5 py-2.5 bg-indigo-600 text-white hover:bg-indigo-700 inline-flex items-center gap-2"
              onClick={triggerUpload}
            >
              <span className="-mt-[1px]">📎</span>
              <span>Upload Practitioners</span>
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={onFileSelected}
              className="hidden"
            />
          </div>
        </Card>
      )}
    </Page>
  );
}
