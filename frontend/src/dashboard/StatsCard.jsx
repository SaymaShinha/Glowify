export default function StatsCard({ title, value, icon, timeInterval }) {
  return (
    <div className="stat shadow-lg p-2 rounded-lg overflow-hidden">
      <div className="stat-figure text-secondary text-sm md:text-4xl">
        {icon}
      </div>

      <div className="stat-title text-sm sm:text-base">
        {title}
      </div>

      <div className="stat-value text-2xl sm:text-4xl">
        {value}
      </div>

      <div className="stat-desc text-xs sm:text-sm">
        {timeInterval}
      </div>
    </div>
  );
}