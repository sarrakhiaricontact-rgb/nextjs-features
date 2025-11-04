import React from "react";
import {
  Cloud,
  CloudRain,
  Sun,
  CloudSnow,
  CloudDrizzle,
  CloudLightning,
  CloudFog,
} from "lucide-react";
import { WeatherCondition, CurrentWeather } from "./types";

type IconSize = string;

export const getWeatherIcon = (
  condition: WeatherCondition | undefined,
  size: IconSize = "w-12 h-12"
): React.ReactNode => {
  const code = condition?.code;

  if (!code) return <Cloud className={size} />;

  if (code === 1000) return <Sun className={`${size} text-yellow-400`} />;
  if (
    [1063, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(code)
  )
    return <CloudRain className={`${size} text-blue-400`} />;
  if ([1066, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(code))
    return <CloudSnow className={`${size} text-blue-200`} />;
  if ([1087, 1273, 1276, 1279, 1282].includes(code))
    return <CloudLightning className={`${size} text-yellow-300`} />;
  if ([1150, 1153, 1168, 1171].includes(code))
    return <CloudDrizzle className={`${size} text-blue-300`} />;
  if ([1135, 1147].includes(code))
    return <CloudFog className={`${size} text-gray-400`} />;
  return <Cloud className={`${size} text-gray-400`} />;
};

export const getBackgroundGradient = (
  weather: CurrentWeather | null
): string => {
  if (!weather) return "from-blue-400 to-blue-600";

  const isDay = weather.is_day === 1;

  if (isDay) {
    if (weather.condition.code === 1000)
      return "from-blue-400 via-blue-500 to-blue-600";
    if (weather.condition.text.toLowerCase().includes("rain"))
      return "from-gray-500 via-gray-600 to-gray-700";
    if (weather.condition.text.toLowerCase().includes("cloud"))
      return "from-blue-300 via-gray-400 to-gray-500";
    return "from-cyan-400 via-blue-500 to-blue-600";
  } else {
    return "from-indigo-900 via-purple-900 to-pink-900";
  }
};
