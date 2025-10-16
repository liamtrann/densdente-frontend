
import Breadcrumbs from "../../common/Breadcrumbs";
import Button from "../../common/Button";
import Card from "../../common/Card";
import Pagination from "../../common/Pagination"; // <-- new
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import DataTable from "../../common/DataTable";

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

  const handlePageSizeChange = (n) => {
    setPage(1);
    setPageSize(n);
  };

  const columns = [
    { key: "clinic", header: "Clinic", width: 160, nowrap: true },
    { key: "first", header: "First Name" },
    { key: "last", header: "Last Name" },
    { key: "role", header: "DDS/HYG", width: 110 },
    { key: "status", header: "Status", width: 120 },
    {
      header: "Actions",
      align: "right",
      nowrap: true,
      render: () => (
        <Button variant="outline" size="sm">
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div className="sched-page">
      <div className="topbar">
        <div className="topbar__left">
          <Breadcrumbs
            items={[{ label: "Pages" }, { label: "Scheduling Dashboard" }]}
          />
          <h1 className="topbar__title">Scheduling Dashboard</h1>
        </div>
        <div className="topbar__right">
          <Button as={Link} to="/admin" variant="outline">
            Back to Admin Dashboard
          </Button>
          <Button variant="ghost">Logout</Button>
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab ${tab === "practitioners" ? "is-active" : ""}`}
          onClick={() => setTab("practitioners")}
        >
          Practitioners
        </button>
        <button
          className={`tab ${tab === "upload" ? "is-active" : ""}`}
          onClick={() => setTab("upload")}
        >
          Upload Practitioners
        </button>
      </div>

      {tab === "practitioners" && (
        <Card title="Practitioners">
          <p className="muted" style={{ marginTop: -6, marginBottom: 12 }}>
            View and manage clinic practitioners below.
          </p>

          <input
            className="search"
            placeholder="Search for Practitioners by Clinic or Name..."
            value={q}
            onChange={(e) => {
              setPage(1);
              setQ(e.target.value);
            }}
          />

          <div style={{ marginTop: 12 }}></div>

          <DataTable
            columns={columns}
            data={data}
            rowKey={(r, i) => `${r.clinic}-${i}`}
          />

          {/* Reusable paginator */}
          <Pagination
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={setPage}
            onPageSizeChange={handlePageSizeChange}
          />
        </Card>
      )}

      {tab === "upload" && (
        <Card title="Upload Practitioners">
          <p className="muted">Coming soon: CSV upload form.</p>
        </Card>
      )}
    </div>
  );
}
