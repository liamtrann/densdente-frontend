import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumbs,
  Button,
  Card,
  Badge,
  Pagination,
  DataTable,
  StatCard,
  LogoutButton,
  Page,
} from "../../common";
import Tabs from "../../common/Tabs"; // NEW
import PerformancePatients from "./PerformancePatients"; // NEW
import Forecasts from "./Forecasts";
import Downloads from "./Downloads";

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

  // tabs
  const [tab, setTab] = useState("overview");

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

  // table columns
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
        <Button
          size="sm"
          variant="outline"
          className="rounded-full px-4 py-1.5 border-2 border-indigo-300 text-indigo-700 hover:border-indigo-400"
        >
          Go to Clinic Dashboard
        </Button>
      ),
    },
  ];

  return (
    <Page>
      {/* Top bar */}
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
          <LogoutButton />
        </div>
      </div>
      {/* Overview stats */}
      <div className="mb-4">
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
      {/* Tabs (matches your reference UI) */}
      <Tabs
        value={tab}
        onChange={setTab}
        items={[
          { key: "overview", label: "Overview" },

          { key: "performance", label: "Performance & Patients" },
          { key: "forecasts", label: "Forecasts" },
          { key: "download", label: "Download" },
        ]}
      />
      {/* Overview table */}
      {tab === "overview" && (
        <div className="mt-2">
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
      )}
      {tab === "performance" && <PerformancePatients />} {/* NEW */}
      {tab === "performance" && <PerformancePatients />}{" "}
      {tab === "download" && <Downloads />}
      {/* if you have this */} {tab === "forecasts" && <Forecasts />}{" "}
      {/* NEW */}
    </Page>
  );
}
