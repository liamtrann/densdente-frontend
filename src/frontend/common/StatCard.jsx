import Card from "./Card";

export default function StatCard({ icon = "📊", label, value, helper }) {
  return (
    <Card>
      <div className="stat">
        <div className="stat__icon" aria-hidden>
          {icon}
        </div>
        <div className="stat__content">
          <div className="stat__label">{label}</div>
          <div className="stat__value">{value}</div>
          {helper && <div className="stat__helper">{helper}</div>}
        </div>
      </div>
    </Card>
  );
}
