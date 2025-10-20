// src/frontend/pages/admin/Forecasts.jsx
import { useMemo, useState } from "react";
import { Card, DataTable, Pagination } from "../../common";

const ROWS = [
  { clinic: "ON-N-BEL", mtd: 54487.09, forecast: 49774.6 },
  { clinic: "NL-G-EXP", mtd: 170652.52, forecast: 149500.0 },
  { clinic: "ON-C-YOR", mtd: 92836.68, forecast: 95000.0 },
  { clinic: "ON-T-OSC", mtd: 0, forecast: 0 },
  { clinic: "QC-M-ARI", mtd: 41864.14, forecast: 26000.0 },
  { clinic: "ON-T-RGH", mtd: 103173.08, forecast: 55000.0 },
  { clinic: "AB-E-AES", mtd: 137943.8, forecast: 73000.0 },
  { clinic: "ON-T-EVD", mtd: 168798.75, forecast: 90000.0 },
  { clinic: "NS-H-PKL", mtd: 108991.0, forecast: 25000.0 },
  { clinic: "AB-R-RED", mtd: 19023.76, forecast: 25000.0 },
  // add more rows if you want to see multiple pages
];

export default function Forecasts() {
  // pagination
  const [page, setPage] = useState(1); // 1-based
  const [pageSize, setPageSize] = useState(10);

  const totalItems = ROWS.length;
  const start = (page - 1) * pageSize;
  const data = useMemo(
    () =>
      ROWS.slice(start, start + pageSize).map((r) => ({
        ...r,
        total: (r.mtd || 0) + (r.forecast || 0),
      })),
    [page, pageSize]
  );

  const columns = [
    { key: "clinic", header: "CLINIC", width: 180, nowrap: true },
    {
      key: "mtd",
      header: "MTD PRODUCTION",
      align: "left",
      render: (r) => currency(r.mtd),
    },
    {
      key: "forecast",
      header: "FORECAST",
      align: "left",
      render: (r) => currency(r.forecast),
    },
    {
      key: "total",
      header: "TOTAL",
      align: "left",
      render: (r) => currency(r.total),
    },
  ];

  return (
    <Card title="Forecasts at a Glance" className="mt-2" bodyClassName="p-0">
      <DataTable columns={columns} data={data} rowKey={(r) => r.clinic} />

      <div className="px-4 pb-4">
        <Pagination
          page={page}
          pageSize={pageSize}
          total={totalItems}
          onPageChange={setPage}
          onPageSizeChange={(n) => {
            setPage(1);
            setPageSize(n);
          }}
        />
      </div>
    </Card>
  );
}

function currency(n) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(n || 0);
}
