import { ForecastDay } from "../lib/types";
import { getWeatherIcon } from "../lib/weatherUtils";

interface ForecastItemProps {
  day: ForecastDay;
  index: number;
}

export default function ForecastItem({ day, index }: ForecastItemProps) {
  const date = new Date(day.date);
  const weekday =
    index === 0
      ? "Today"
      : date.toLocaleDateString("en-US", { weekday: "short" });

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/20 transition-all cursor-pointer">
      <p className="text-white font-medium mb-3">{weekday}</p>
      <div className="flex justify-center mb-3">
        {getWeatherIcon(day.day.condition, "w-10 h-10")}
      </div>
      <div className="text-white">
        <p className="text-xl font-bold">{Math.round(day.day.maxtemp_c)}°</p>
        <p className="text-sm text-white/70">
          {Math.round(day.day.mintemp_c)}°
        </p>
      </div>
      <p className="text-xs text-white/80 mt-2">{day.day.condition.text}</p>
    </div>
  );
}
