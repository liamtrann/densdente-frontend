// src/pages/reporting/Reporting.jsx
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Badge,
  Breadcrumbs,
  Button,
  Card,
  FormField,
  LogoutButton,
  Page,
  Tabs,
} from "../../common";
import Forecasting from "./Forecasting"; // <-- already added earlier
import NewPatients from "./NewPatients"; // <-- NEW import

/* -----------------------------------------------------------
   Demo data (replace with API later)
----------------------------------------------------------- */
const CLINIC_PRACTITIONERS = {
  "ON-C-CWL": [
    { id: "p1", name: "Dr. David Mcdonell", role: "DDS", status: "ACTIVE" },
    { id: "p2", name: "Mary Bard", role: "HYG", status: "ACTIVE" },
    { id: "p3", name: "Sarah Seale", role: "HYG", status: "ACTIVE" },
    { id: "p4", name: "Adele Hamer", role: "HYG", status: "ACTIVE" },
  ],
  "ON-T-EVD": [
    { id: "p1", name: "Dr. Alex Ko", role: "DDS", status: "ACTIVE" },
    { id: "p2", name: "Rina Patel", role: "HYG", status: "ACTIVE" },
  ],
  "ON-W-OSW": [
    { id: "p1", name: "Dr. Jane Sunny", role: "DDS", status: "ACTIVE" },
    { id: "p2", name: "A. Hygienist", role: "HYG", status: "ACTIVE" },
  ],
};

export default function Reporting() {
  const { clinicId = "ON-C-CWL" } = useParams();

  // top date + KPIs
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const kpis = useMemo(
    () => [
      {
        label: "Date",
        render: () => (
          <input
            type="date"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        ),
      },
      { label: "Total Production Reported", value: "$0.00", icon: "🏠" },
      { label: "Total Collection Reported", value: "$0.00", icon: "🐷" },
    ],
    [date]
  );

  // tabs
  const [tab, setTab] = useState("financial");

  // practitioners
  const roster = CLINIC_PRACTITIONERS[clinicId] ?? [];
  const [activePid, setActivePid] = useState(roster[0]?.id || "");
  const activePerson = useMemo(
    () => roster.find((p) => p.id === activePid) || roster[0],
    [roster, activePid]
  );

  // FINANCIAL form values
  const [vals, setVals] = useState({
    production: "",
    collection: "",
    lab: "",
    material: "",
    invisalign: "",
    hours: "",
  });

  const requiredErrors = useMemo(() => {
    const e = {};
    if (!vals.production) e.production = "Required";
    if (!vals.collection) e.collection = "Required";
    if (!vals.hours) e.hours = "Required";
    return e;
  }, [vals]);
  const canSubmit = Object.keys(requiredErrors).length === 0;

  function onSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    console.log("SUBMIT REPORT", {
      clinicId,
      date,
      practitioner: activePerson,
      values: vals,
    });
    alert("Submitted (demo). Check console for payload.");
  }

  return (
    <Page>
      {/* Header / Topbar */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <Breadcrumbs
            items={[{ label: "Pages" }, { label: "Reporting Dashboard" }]}
          />
          <h1 className="mt-2 text-[32px] leading-tight font-extrabold">
            Reporting Dashboard
          </h1>
        </div>
        <div className="flex gap-3">
          <Button as={Link} to="/admin" variant="outline">
            Back to Admin Dashboard
          </Button>
          <LogoutButton />
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-5">
        {kpis.map((k, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md p-4">
            <div className="text-sm text-gray-500 mb-2">{k.label}</div>
            {k.render ? (
              k.render()
            ) : (
              <div className="text-2xl font-extrabold">{k.value}</div>
            )}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={setTab}
        items={[
          { key: "financial", label: "Financial Reporting" },
          { key: "patients", label: "New Patients" }, // enabled
          { key: "forecast", label: "Forecasting" },
        ]}
      />

      {/* FINANCIAL TAB */}
      {tab === "financial" && (
        <Card className="mt-4">
          <h2 className="text-lg font-bold mb-4">
            {clinicId}'s Performance Report
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* LEFT: practitioners list */}
            <Card className="shadow-none">
              <div className="divide-y rounded-xl border border-gray-100 overflow-hidden">
                {roster.map((p) => {
                  const selected = p.id === activePerson?.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActivePid(p.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-left ${
                        selected ? "bg-indigo-50" : "bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Badge color={p.role === "DDS" ? "neutral" : "success"}>
                          {p.role}
                        </Badge>
                        <span className="font-medium">{p.name}</span>
                      </div>
                      <Badge color="success">{p.status}</Badge>
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* RIGHT: form */}
            <form onSubmit={onSubmit}>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-base font-semibold">
                  Cost & Production Breakdown for{" "}
                  <span className="font-bold">{activePerson?.name || "—"}</span>
                </h3>
                {activePerson && (
                  <>
                    <Badge color="neutral">{activePerson.role}</Badge>
                    <Badge color="success">{activePerson.status}</Badge>
                  </>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  label="Production *"
                  placeholder="Enter production value"
                  value={vals.production}
                  onChange={(e) =>
                    setVals((v) => ({ ...v, production: e.target.value }))
                  }
                  error={requiredErrors.production}
                  showError
                />
                <FormField
                  label="Collection *"
                  placeholder="Enter collection value"
                  value={vals.collection}
                  onChange={(e) =>
                    setVals((v) => ({ ...v, collection: e.target.value }))
                  }
                  error={requiredErrors.collection}
                  showError
                />
                <FormField
                  label="Lab Costs"
                  placeholder="Enter lab costs"
                  value={vals.lab}
                  onChange={(e) =>
                    setVals((v) => ({ ...v, lab: e.target.value }))
                  }
                />
                <FormField
                  label="Material Costs"
                  placeholder="Enter material costs"
                  value={vals.material}
                  onChange={(e) =>
                    setVals((v) => ({ ...v, material: e.target.value }))
                  }
                />
                <FormField
                  label="Invisalign Costs"
                  placeholder="Enter Invisalign costs"
                  value={vals.invisalign}
                  onChange={(e) =>
                    setVals((v) => ({ ...v, invisalign: e.target.value }))
                  }
                />
                <FormField
                  label="Hours Worked *"
                  placeholder="Enter hours worked"
                  value={vals.hours}
                  onChange={(e) =>
                    setVals((v) => ({ ...v, hours: e.target.value }))
                  }
                  error={requiredErrors.hours}
                  showError
                />
              </div>

              <div className="mt-5 flex justify-end">
                <Button as="button" type="submit" disabled={!canSubmit}>
                  Submit
                </Button>
              </div>

              <div className="mt-2 text-xs text-gray-500">
                Fields marked with <span className="text-rose-600">*</span> are
                required
              </div>
            </form>
          </div>
        </Card>
      )}

      {/* NEW PATIENTS TAB */}
      {tab === "patients" && <NewPatients date={date} />}

      {/* FORECASTING TAB */}
      {tab === "forecast" && (
        <Forecasting initialClinicId={clinicId} date={date} />
      )}
    </Page>
  );
}
