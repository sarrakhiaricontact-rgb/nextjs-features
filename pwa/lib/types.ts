export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface CurrentWeather {
  last_updated: string;
  temp_c: number;
  feelslike_c: number;
  is_day: 0 | 1;
  condition: WeatherCondition;
  wind_kph: number;
  humidity: number;
  vis_km: number;
  pressure_mb: number;
}

export interface ForecastDayDetails {
  maxtemp_c: number;
  mintemp_c: number;
  condition: WeatherCondition;
}

export interface ForecastDay {
  date: string;
  day: ForecastDayDetails;
}

export interface WeatherAPIResponse {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: CurrentWeather;
  forecast: {
    forecastday: ForecastDay[];
  };
}
