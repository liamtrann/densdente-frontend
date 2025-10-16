// src/frontend/pages/scheduling/Scheduling.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumbs,
  Button,
  Card,
  Pagination,
  DataTable,
  LogoutButton,
  Page, // <-- add
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
      render: () => <Button size="sm">Edit</Button>,
    },
  ];

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
          <LogoutButton /> {/* was: <Button variant="ghost">Logout</Button> */}
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={setTab}
        items={[
          { id: "practitioners", label: "Practitioners" },
          { id: "upload", label: "Upload Practitioners" },
        ]}
      />

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

      {tab === "upload" && (
        <Card title="Upload Practitioners">
          <p className="text-gray-500">Coming soon: CSV upload form.</p>
        </Card>
      )}
    </Page>
  );
}
