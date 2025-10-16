import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function Badge({ children, ok }) {
  return (
    <span
      className={`inline-block px-2.5 py-1 text-xs font-bold rounded-full ${
        ok ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
      }`}
    >
      {children}
    </span>
  );
}

function Button({
  as: Comp = "button",
  variant = "outline",
  size = "md",
  className = "",
  ...props
}) {
  const variants = {
    outline:
      "bg-white text-indigo-600 border-2 border-indigo-300 hover:border-indigo-400",
    ghost: "bg-transparent text-gray-600 hover:text-gray-800",
  };
  const sizes = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm" };
  return (
    <Comp
      className={`inline-flex items-center justify-center font-semibold rounded-full transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}

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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { total, data } = useMemo(() => {
    const start = (page - 1) * pageSize;
    return {
      total: allRows.length,
      data: allRows.slice(start, start + pageSize),
    };
  }, [page, pageSize]);

  return (
    <div className="min-h-screen bg-indigo-50/40 text-gray-900 p-6">
      {/* topbar */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="text-sm text-gray-500">
            <span>Pages</span>
            <span className="mx-2 text-gray-300">/</span>
            <span>Admin Dashboard</span>
          </div>
          <h1 className="mt-1 text-3xl font-extrabold">Admin Dashboard</h1>
        </div>
        <div className="flex gap-3">
          <Button as={Link} to="/scheduling" variant="outline">
            To Scheduling Dashboard
          </Button>
          <Button variant="ghost">Logout</Button>
        </div>
      </div>

      {/* overview */}
      <section className="mt-4">
        <h2 className="text-lg font-bold mb-3">Overview</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: "📅", label: "Date", value: today },
            {
              icon: "📊",
              label: "Production Report Submissions",
              value: "1/40",
            },
            {
              icon: "💳",
              label: "Collection Report Submissions",
              value: "0/40",
            },
            {
              icon: "📈",
              label: "Forecast Report Submissions",
              value: "12/40",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-3"
            >
              <div className="w-11 h-11 flex items-center justify-center text-lg bg-indigo-50 rounded-xl">
                {s.icon}
              </div>
              <div>
                <div className="text-xs text-gray-500">{s.label}</div>
                <div className="text-2xl font-extrabold leading-tight">
                  {s.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* reporting status */}
      <section className="mt-6">
        <h2 className="text-lg font-bold mb-3">Reporting Status</h2>
        <div className="bg-white rounded-2xl shadow-md">
          <div className="overflow-auto">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  {[
                    "Clinic",
                    "Practitioner Production Reports",
                    "Collection Reports Submitted",
                    "Forecast Report Submitted",
                    "Number of Patients Submitted",
                    "Management Actions",
                  ].map((h, i) => (
                    <th
                      key={i}
                      className="px-3 py-2 text-left text-xs font-semibold text-gray-500 border-b border-gray-100"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((r) => (
                  <tr key={r.clinic} className="border-b border-gray-100">
                    <td className="px-3 py-3">{r.clinic}</td>
                    <td className="px-3 py-3">
                      <Badge ok={r.prodOk}>{r.prod}</Badge>
                    </td>
                    <td className="px-3 py-3">
                      <Badge ok={r.colOk}>{r.col}</Badge>
                    </td>
                    <td className="px-3 py-3">
                      <Badge ok={r.fcOk}>{r.fc}</Badge>
                    </td>
                    <td className="px-3 py-3 text-right">{r.pts}</td>
                    <td className="px-3 py-3 text-right whitespace-nowrap">
                      <Button size="sm" className="mr-2">
                        Go to Clinic Dashboard
                      </Button>
                      <Button as={Link} to="/scheduling" size="sm">
                        To Scheduling Dashboard
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* pager */}
          <div className="flex items-center justify-between text-sm text-gray-600 px-4 py-3">
            <span>
              Page {page} of {Math.max(1, Math.ceil(total / pageSize))}
            </span>
            <div className="flex items-center gap-2">
              <label>Go to page:</label>
              <select
                className="border rounded-md px-2 py-1"
                value={page}
                onChange={(e) => setPage(parseInt(e.target.value, 10))}
              >
                {Array.from(
                  { length: Math.max(1, Math.ceil(total / pageSize)) },
                  (_, i) => i + 1
                ).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <label className="ml-2">Show</label>
              <select
                className="border rounded-md px-2 py-1"
                value={pageSize}
                onChange={(e) => {
                  setPage(1);
                  setPageSize(parseInt(e.target.value, 10));
                }}
              >
                {[10, 25, 50].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
