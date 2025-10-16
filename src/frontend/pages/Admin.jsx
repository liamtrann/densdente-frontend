// src/frontend/pages/Admin.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumbs,
  Button,
  Card,
  Badge,
  Pagination,
  DataTable,
  StatCard, // if you use it
  LogoutButton,
  Page,
} from "../common"; // <— page imports only from ../common to avoid cycles

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

  // pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { total, data } = useMemo(() => {
    const start = (page - 1) * pageSize;
    return {
      total: allRows.length,
      data: allRows.slice(start, start + pageSize),
    };
  }, [page, pageSize]);

  // columns
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
      width: 180,
      align: "right",
    },
    {
      header: "Management Actions",
      align: "right",
      nowrap: true,
      render: () => (
        <>
          <Button size="sm" className="mr-2">
            Go to Clinic Dashboard
          </Button>
          <Button as={Link} to="/scheduling" size="sm">
            To Scheduling Dashboard
          </Button>
        </>
      ),
    },
  ];

  return (
    <Page>
      {/* Topbar */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <Breadcrumbs
            items={[{ label: "Pages" }, { label: "Admin Dashboard" }]}
          />
          <h1 className="mt-2 text-[32px] leading-tight font-extrabold">
            Admin Dashboard
          </h1>
        </div>
        <div className="flex gap-3">
          <Button as={Link} to="/scheduling" variant="outline">
            To Scheduling Dashboard
          </Button>
          <LogoutButton /> {/* was: <Button variant="ghost">Logout</Button> */}
        </div>
      </div>

      {/* Overview */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-3">Overview</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard icon="📅" label="Date" value={today} />
          <StatCard
            icon="📊"
            label="Production Report Submissions"
            value="1/40"
          />
          <StatCard
            icon="💳"
            label="Collection Report Submissions"
            value="0/40"
          />
          <StatCard
            icon="📈"
            label="Forecast Report Submissions"
            value="12/40"
          />
        </div>
      </div>

      {/* Reporting Status */}
      <div>
        <h2 className="text-lg font-bold mb-3">Reporting Status</h2>

        <Card bodyClassName="p-0">
          <DataTable columns={columns} data={data} rowKey={(r) => r.clinic} />
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
      </div>
    </Page>
  );
}
