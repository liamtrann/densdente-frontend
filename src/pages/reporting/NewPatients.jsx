// src/pages/reporting/NewPatients.jsx
import { useState } from "react";
import { Button, Card, FormField } from "../../common";

const LEAD_CATEGORIES = [
  "Email Blast/Marketing",
  "Referral",
  "Walk-in",
  "Google Ads",
  "Social Media",
  "Website",
  "Other",
];

export default function NewPatients({ date: parentDate }) {
  // You can default to parent date but keep it editable (matches screenshot with a date on the right)
  const [date, setDate] = useState(
    parentDate || new Date().toISOString().slice(0, 10)
  );
  const [patientName, setPatientName] = useState("");
  const [leadCategory, setLeadCategory] = useState(LEAD_CATEGORIES[0]);

  const canSubmit = patientName.trim().length > 0;

  function onSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    // Swap this for your API call later
    console.log("NEW PATIENT (demo payload)", {
      date,
      patientName: patientName.trim(),
      leadCategory,
    });
    alert("New patient submitted (demo). Check console for payload.");

    // Optional: reset
    setPatientName("");
    setLeadCategory(LEAD_CATEGORIES[0]);
  }

  return (
    <Card className="mt-4">
      {/* Header row with title on left and date picker on right */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Patient Information Form</h2>
        <input
          type="date"
          className="w-[200px] rounded-xl border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <form onSubmit={onSubmit} className="max-w-2xl">
        {/* Patient Name */}
        <div className="mb-5">
          <FormField
            label="Patient Name"
            placeholder="Patient name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
            showError={false}
          />
        </div>

        {/* Lead Category */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">
            Lead Category
          </label>
          <select
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-200"
            value={leadCategory}
            onChange={(e) => setLeadCategory(e.target.value)}
          >
            {LEAD_CATEGORIES.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Submit button (green gradient like your mock) */}
        <Button
          as="button"
          type="submit"
          disabled={!canSubmit}
          className="rounded-full px-8 py-3 font-semibold text-white w-full
                     bg-gradient-to-r from-emerald-400 to-emerald-500
                     hover:from-emerald-500 hover:to-emerald-600 disabled:opacity-40"
        >
          Submit
        </Button>
      </form>
    </Card>
  );
}
