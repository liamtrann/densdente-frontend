import Card from "./Card";
export default function StatCard({ icon = "📊", label, value, helper }) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 flex items-center justify-center text-lg bg-indigo-50 rounded-xl">
          {icon}
        </div>
        <div>
          <div className="text-xs text-gray-500">{label}</div>
          <div className="text-2xl font-extrabold leading-tight">{value}</div>
          {helper && <div className="text-xs text-gray-500">{helper}</div>}
        </div>
      </div>
    </Card>
  );
}
