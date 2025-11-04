"use client";

import React, { useState, useEffect } from "react";
import { Search, Loader } from "lucide-react";
import WeatherCard from "./WeatherCard";
import ForecastItem from "./ForecastItem";
import { getBackgroundGradient } from "../lib/weatherUtils";
import { CurrentWeather, ForecastDay, WeatherAPIResponse } from "../lib/types";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API;
export default function WeatherApp() {
  const [city, setCity] = useState("Paris");
  const [searchInput, setSearchInput] = useState("");
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (cityName: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=5&aqi=yes`
      );

      if (!response.ok) {
        // Tentative de récupérer un message d'erreur plus précis de l'API
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
          errorData.error?.message || "City not found or API error.";
        throw new Error(errorMessage);
      }

      // Assurer que la réponse est du type attendu
      const data: WeatherAPIResponse = await response.json();

      setWeather(data.current);
      setForecast(data.forecast.forecastday);
      setCity(data.location.name);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = () => {
    if (searchInput.trim()) {
      fetchWeather(searchInput);
      setSearchInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (loading && !weather) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <Loader className="w-12 h-12 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-linear-to-br ${getBackgroundGradient(
        weather
      )} p-4 transition-all duration-1000`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 mt-4">
          <div className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for a city..."
              className="w-full px-4 py-3 pl-12 rounded-2xl bg-white/20 backdrop-blur-md text-white placeholder-white/70 border-2 border-white/30 focus:outline-none focus:border-white/50 transition-all"
            />
            <button
              onClick={handleSearch}
              className="absolute left-4 top-3.5 text-white/70 hover:text-white transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
          {error && (
            <p className="mt-2 text-white/90 text-sm bg-red-500/30 backdrop-blur-sm px-4 py-2 rounded-lg">
              {error}
            </p>
          )}
        </div>

        {weather && (
          <>
            <WeatherCard weather={weather} city={city} />

            <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/30 mt-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                5-Day Forecast
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {forecast.map((day, index) => (
                  <ForecastItem key={day.date} day={day} index={index} />
                ))}
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-white/80 text-sm">
                Last updated:{" "}
                {new Date(weather.last_updated).toLocaleTimeString()}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
