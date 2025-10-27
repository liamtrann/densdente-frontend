// src/pages/reporting/CollectionBreakdown.jsx
import { useMemo, useState } from "react";
import { Button, Card, FormField } from "../../common";

export default function CollectionBreakdown({ clinicId }) {
  // cash / credit / eft inputs; "other" shows as computed/disabled per mock
  const [vals, setVals] = useState({ cash: "", credit: "", eft: "" });

  const total = useMemo(() => {
    const c1 = Number(vals.cash) || 0;
    const c2 = Number(vals.credit) || 0;
    const c3 = Number(vals.eft) || 0;
    return c1 + c2 + c3;
  }, [vals]);

  const canSubmit = ["cash", "credit", "eft"].every(
    (k) => (vals[k] + "").trim().length > 0
  );

  function onSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    // Replace with API call
    console.log("COLLECTION BREAKDOWN SUBMIT (demo)", {
      clinicId,
      cash: Number(vals.cash) || 0,
      credit: Number(vals.credit) || 0,
      eft: Number(vals.eft) || 0,
      other: 0, // auto-calculated server-side if you want
      total,
    });
    alert("Collection breakdown submitted (demo). Check console for payload.");
  }

  return (
    <Card className="mt-6">
      <h2 className="text-lg font-bold mb-4">
        {clinicId}'s Collection Breakdown Report
      </h2>

      <form onSubmit={onSubmit}>
        {/* Total (readonly) */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            <span className="inline-flex items-center gap-1">
              <span className="inline-block w-4 h-4 text-indigo-600">ℹ️</span>
              Total
            </span>
          </label>
          <input
            type="text"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 text-gray-700"
            value={total}
            disabled
            readOnly
          />
        </div>

        {/* Three required inputs */}
        <div className="grid gap-4 md:grid-cols-3">
          <FormField
            label="Cash *"
            placeholder="Enter cash amount"
            value={vals.cash}
            onChange={(e) => setVals((v) => ({ ...v, cash: e.target.value }))}
            required
            showError={false}
          />
          <FormField
            label="Credit *"
            placeholder="Enter credit amount"
            value={vals.credit}
            onChange={(e) => setVals((v) => ({ ...v, credit: e.target.value }))}
            required
            showError={false}
          />
          <FormField
            label="Electronic Transfers *"
            placeholder="Enter EFT amount"
            value={vals.eft}
            onChange={(e) => setVals((v) => ({ ...v, eft: e.target.value }))}
            required
            showError={false}
          />
        </div>

        {/* Other (disabled) */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Other</label>
          <input
            type="text"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 text-gray-700"
            value="Calculated automatically..."
            disabled
            readOnly
          />
        </div>

        <div className="mt-2 text-xs text-gray-500">
          Fields marked with <span className="text-rose-600">*</span> are
          required
        </div>

        <div className="mt-5 flex justify-end">
          <Button
            as="button"
            type="submit"
            disabled={!canSubmit}
            className="rounded-full px-8 py-3 font-semibold text-white
                       bg-gradient-to-r from-emerald-400 to-emerald-500
                       hover:from-emerald-500 hover:to-emerald-600 disabled:opacity-40"
          >
            Submit
          </Button>
        </div>
      </form>
    </Card>
  );
}
