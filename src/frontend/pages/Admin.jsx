import "./admin.css";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Breadcrumbs from "../common/Breadcrumbs";
import Button from "../common/Button";
import Card from "../common/Card"; // used to wrap the table area
import Badge from "../common/Badge";
import StatCard from "../common/StatCard"; // <-- use the reusable stat card
import DataTable from "../common/DataTable";
import Pagination from "../common/Pagination";

const allRows = [
  {
    clinic: "ON-T-EVD",
    prod: "SUBMITTED 4 OF 14 REPORTS",
    prodOk: true,
    col: "NOT SUBMITTED",
    colOk: false,
    fc: "NOT SUBMITTED",
    fcOk: false,
    pts: 0,
  },
  {
    clinic: "ON-C-CWL",
    prod: "NO REPORTS SUBMITTED",
    prodOk: false,
    col: "NOT SUBMITTED",
    colOk: false,
    fc: "NOT SUBMITTED",
    fcOk: false,
    pts: 0,
  },
  {
    clinic: "NS-H-LAC",
    prod: "NO REPORTS SUBMITTED",
    prodOk: false,
    col: "NOT SUBMITTED",
    colOk: false,
    fc: "SUBMITTED",
    fcOk: true,
    pts: 0,
  },
];

export default function Admin() {
  const today = new Date().toLocaleDateString("en-CA");

  // --- pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // visible rows
  const { total, data } = useMemo(() => {
    const start = (page - 1) * pageSize;
    return {
      total: allRows.length,
      data: allRows.slice(start, start + pageSize),
    };
  }, [page, pageSize]);

  const handlePageSizeChange = (n) => {
    setPage(1);
    setPageSize(n);
  };

  // --- table columns
  const columns = [
    { key: "clinic", header: "Clinic", width: 160, nowrap: true },
    {
      header: "Practitioner Production Reports",
      render: (r) => (
        <Badge color={r.prodOk ? "success" : "danger"}>{r.prod}</Badge>
      ),
    },
    {
      header: "Collection Reports Submitted",
      render: (r) => (
        <Badge color={r.colOk ? "success" : "danger"}>{r.col}</Badge>
      ),
    },
    {
      header: "Forecast Report Submitted",
      render: (r) => (
        <Badge color={r.fcOk ? "success" : "danger"}>{r.fc}</Badge>
      ),
    },
    {
      key: "pts",
      header: "Number of Patients Submitted",
      width: 140,
      align: "right",
    },
    {
      header: "Management Actions",
      align: "right",
      nowrap: true,
      render: () => (
        <>
          <Button variant="outline" size="sm" style={{ marginRight: 8 }}>
            Go to Clinic Dashboard
          </Button>
          <Button as={Link} to="/scheduling" variant="outline" size="sm">
            To Scheduling Dashboard
          </Button>
        </>
      ),
    },
  ];

  // --- overview stats (drives StatCard rendering)
  const stats = [
    { icon: "📅", label: "Date", value: today },
    { icon: "📊", label: "Production Report Submissions", value: "1/40" },
    { icon: "💳", label: "Collection Report Submissions", value: "0/40" },
    { icon: "📈", label: "Forecast Report Submissions", value: "12/40" },
  ];

  return (
    <div className="admin-page">
      {/* Top bar */}
      <div className="topbar">
        <div className="topbar__left">
          <Breadcrumbs
            items={[{ label: "Pages" }, { label: "Admin Dashboard" }]}
          />
          <h1 className="topbar__title">Admin Dashboard</h1>
        </div>
        <div className="topbar__right">
          <Button as={Link} to="/scheduling" variant="outline">
            To Scheduling Dashboard
          </Button>
          <Button variant="ghost">Logout</Button>
        </div>
      </div>

      {/* Overview (now using StatCard, no repetition) */}
      <div className="section">
        <h2 className="section__title">Overview</h2>
        <div className="grid grid--stats">
          {stats.map((s, i) => (
            <StatCard
              key={i}
              icon={s.icon}
              label={s.label}
              value={s.value}
              helper={s.helper}
            />
          ))}
        </div>
      </div>

      {/* Reporting Status */}
      <div className="section">
        <h2 className="section__title">Reporting Status</h2>
        <Card>
          <DataTable columns={columns} data={data} rowKey="clinic" />
          <Pagination
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={setPage}
            onPageSizeChange={handlePageSizeChange}
          />
        </Card>
      </div>
    </div>
  );
}
