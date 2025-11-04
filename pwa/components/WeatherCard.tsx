import React from "react";
import { Wind, Droplets, Eye, Gauge, MapPin, Sun, Cloud } from "lucide-react";
import { CurrentWeather } from "../lib/types";
import { getWeatherIcon } from "../lib/weatherUtils";

interface WeatherCardProps {
  weather: CurrentWeather;
  city: string;
}

const getCardIcon = (
  condition: CurrentWeather["condition"],
  isDay: 0 | 1,
  size: string
) => {
  const code = condition.code;
  if (code === 1000)
    return isDay ? (
      <Sun className={`${size} text-yellow-400`} />
    ) : (
      <Cloud className={`${size} text-gray-300`} />
    );
  return getWeatherIcon(condition, size);
};

export default function WeatherCard({ weather, city }: WeatherCardProps) {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 mb-6 shadow-2xl border border-white/30">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-white" />
        <h2 className="text-3xl font-bold text-white">{city}</h2>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-7xl font-bold text-white mb-2">
            {Math.round(weather.temp_c)}°
          </div>
          <p className="text-xl text-white/90 capitalize">
            {weather.condition.text}
          </p>
          <p className="text-white/80 mt-2">
            Feels like {Math.round(weather.feelslike_c)}°
          </p>
        </div>
        <div className="flex flex-col items-center">
          {getCardIcon(weather.condition, weather.is_day, "w-24 h-24")}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <DetailItem
          icon={Wind}
          label="Wind"
          value={weather.wind_kph}
          unit="km/h"
        />
        <DetailItem
          icon={Droplets}
          label="Humidity"
          value={weather.humidity}
          unit="%"
        />
        <DetailItem
          icon={Eye}
          label="Visibility"
          value={weather.vis_km}
          unit="km"
        />
        <DetailItem
          icon={Gauge}
          label="Pressure"
          value={weather.pressure_mb}
          unit="mb"
        />
      </div>
    </div>
  );
}

interface DetailItemProps {
  icon: React.ElementType;
  label: string;
  value: number;
  unit: string;
}
const DetailItem: React.FC<DetailItemProps> = ({
  icon: Icon,
  label,
  value,
  unit,
}) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
    <div className="flex items-center gap-2 mb-2">
      <Icon className="w-5 h-5 text-white/80" />
      <span className="text-white/80 text-sm">{label}</span>
    </div>
    <p className="text-2xl font-semibold text-white">{value}</p>
    <p className="text-white/70 text-xs">{unit}</p>
  </div>
);
