import "./scheduling.css";
import Breadcrumbs from "../../common/Breadcrumbs";
import Button from "../../common/Button";
import Card from "../../common/Card";
import { Table, THead, Th, TBody, Tr, Td } from "../../common/Table";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

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
  const pageSize = 10;

  const rows = useMemo(() => {
    const filtered = allRows.filter((r) =>
      `${r.clinic} ${r.first} ${r.last}`.toLowerCase().includes(q.toLowerCase())
    );
    const start = (page - 1) * pageSize;
    return {
      total: filtered.length,
      data: filtered.slice(start, start + pageSize),
    };
  }, [q, page]);

  return (
    <div className="sched-page">
      <div className="topbar">
        <div className="topbar__left">
          <Breadcrumbs
            items={[
              { label: "Pages", to: "/" },
              { label: "Scheduling Dashboard" },
            ]}
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

          <div style={{ marginTop: 12 }}>
            <Table>
              <THead>
                <Th>Clinic</Th>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>DDS/HYG</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </THead>
              <TBody>
                {rows.data.map((r, i) => (
                  <Tr key={i}>
                    <Td>{r.clinic}</Td>
                    <Td>{r.first}</Td>
                    <Td>{r.last}</Td>
                    <Td>{r.role}</Td>
                    <Td>{r.status}</Td>
                    <Td>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </TBody>
            </Table>
          </div>

          <div className="pager">
            <span>
              Page {page} of {Math.max(1, Math.ceil(rows.total / pageSize))}
            </span>
            <div className="pager__right">
              <label>Go to page:</label>
              <select
                value={page}
                onChange={(e) => setPage(parseInt(e.target.value, 10))}
              >
                {Array.from(
                  { length: Math.max(1, Math.ceil(rows.total / pageSize)) },
                  (_, i) => i + 1
                ).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <label>Show</label>
              <select disabled>
                <option>{pageSize}</option>
              </select>
            </div>
          </div>
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
