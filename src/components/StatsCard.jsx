// src/components/StatsCard.jsx
export default function StatsCard({
  title,
  value,
  bgColor = "bg-white",
  textColor = "text-gray-800",
}) {
  return (
    <div className={`${bgColor} p-4 rounded-lg shadow-sm`}>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
    </div>
  );
}
