// src/pages/reporting/Forecasting.jsx
import { useMemo, useState } from "react";
import { Button, Card } from "../../common";

/** -----------------------------------------------------------
 * Demo Month-to-Date production per clinic
 * (Replace with API data later.)
 * ---------------------------------------------------------- */
const CLINIC_MTD_PROD = {
  "ON-C-CWL": 0,
  "ON-T-EVD": 0,
  "ON-W-OSW": 79251.49, // mirrors your screenshot
};

/** Currency formatter */
const fmt$ = (n) =>
  (isFinite(n) ? n : 0).toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

/**
 * Forecasting panel
 * Props:
 *  - initialClinicId?: string  (defaults to the first known clinic)
 *  - date: string (YYYY-MM-DD) (used in the payload for now)
 */
export default function Forecasting({ initialClinicId, date }) {
  const clinicKeys = Object.keys(CLINIC_MTD_PROD);
  const defaultClinic = useMemo(
    () =>
      clinicKeys.includes(initialClinicId)
        ? initialClinicId
        : clinicKeys[0] || "",
    [clinicKeys, initialClinicId]
  );

  const [clinicId, setClinicId] = useState(defaultClinic);
  const [forecastValue, setForecastValue] = useState("");

  const mtdProduction = CLINIC_MTD_PROD[clinicId] ?? 0;
  const totalForecast = (Number(forecastValue) || 0) + (mtdProduction || 0);

  function resetForecast() {
    setForecastValue("");
  }

  function saveForecast(e) {
    e?.preventDefault?.();
    // swap this console.log for your API call
    console.log("EDIT FORECAST (demo payload)", {
      clinicId,
      date,
      mtdProduction,
      forecastValue: Number(forecastValue) || 0,
      total: totalForecast,
    });
    alert("Forecast saved (demo). Check console for payload.");
  }

  return (
    <Card className="mt-4">
      <h2 className="text-lg font-bold mb-6">Forecast Report</h2>

      <div className="max-w-2xl">
        {/* Clinic select */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">Clinic</label>
          <select
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-200"
            value={clinicId}
            onChange={(e) => setClinicId(e.target.value)}
          >
            {clinicKeys.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>

        {/* MTD Production (readonly) */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">
            MTD Production
          </label>
          <input
            type="text"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 text-gray-700"
            value={fmt$(mtdProduction)}
            disabled
            readOnly
          />
        </div>

        {/* Forecast value (editable) */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">
            Forecast Value
          </label>
          <input
            type="number"
            inputMode="decimal"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="e.g. 24000"
            value={forecastValue}
            onChange={(e) => setForecastValue(e.target.value)}
          />
        </div>

        {/* Total (computed) */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">Total</label>
          <input
            type="text"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 text-gray-700"
            value={fmt$(totalForecast)}
            disabled
            readOnly
          />
        </div>

        {/* Buttons row – styled like your screenshot */}
        <div className="flex flex-wrap gap-3">
          <Button
            as="button"
            type="button"
            onClick={resetForecast}
            className="rounded-full px-8 py-3 font-semibold text-white
                       bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600"
          >
            Cancel
          </Button>

          <Button
            as="button"
            type="button"
            onClick={saveForecast}
            className="rounded-full px-8 py-3 font-semibold text-white
                       bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600"
          >
            Edit Forecast
          </Button>
        </div>
      </div>
    </Card>
  );
}
