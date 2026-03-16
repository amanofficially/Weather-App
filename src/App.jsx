// ─── App.jsx ─────────────────────────────────────────────────────────────────
// Root component of the Weather App.
// Manages the API call, loading state, error state, and weather data state.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import LoadingSpinner from "./components/LoadingSpinner";

// ── API Key ──────────────────────────────────────────────────────────────────
const API_KEY = import.meta.env.VITE_API_KEY;

export default function App() {
  // ── State ──────────────────────────────────────────────────────────────────
  const [weather, setWeather] = useState(null); // holds API response data
  const [loading, setLoading] = useState(false); // true while waiting for API
  const [error, setError] = useState(""); // stores error message if fetch fails

  // ── API Fetch ──────────────────────────────────────────────────────────────
  // async/await lets us write asynchronous code that looks like synchronous code.
  // Called when user submits the search form.
  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) return; // ignore empty searches

    setLoading(true); // show spinner
    setError(""); // clear previous errors
    try {
      // fetch() makes an HTTP GET request; await pauses until it resolves
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`,
      );
      // If the city is not found, res.ok is false — throw to jump to catch block
      if (!res.ok)
        throw new Error("City not found. Check the spelling and try again.");
      const data = await res.json(); // parse JSON response into a JS object
      setWeather(data);
    } catch (err) {
      setError(err.message); // display error to user
      setWeather(null);
    } finally {
      setLoading(false); // always hide spinner, whether success or error
    }
  };

  // ── Demo Data ──────────────────────────────────────────────────────────────
  // Shown when API_KEY is still the placeholder, so the UI is always visible.
  // Remove this once you add a real API key.
  const demoWeather = {
    name: "Indore",
    sys: { country: "IN" },
    main: { temp: 28, feels_like: 31, humidity: 65, pressure: 1012 },
    weather: [{ description: "partly cloudy", icon: "02d" }],
    wind: { speed: 5.5 },
  };

  // Show demo data if no real API key is set; otherwise show fetched data
  const displayWeather = API_KEY === "YOUR_API_KEY" ? demoWeather : weather;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-600 to-indigo-800 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          🌤 Weather App
        </h1>

        {/* Search bar — passes fetchWeather as onSearch prop */}
        <SearchBar onSearch={fetchWeather} />

        {/* Demo mode notice */}
        {API_KEY === "YOUR_API_KEY" && (
          <p className="text-blue-200 text-xs text-center mt-2">
            Demo mode — replace API_KEY in App.jsx with your real key
          </p>
        )}

        {/* Conditional rendering: show different UI based on state */}
        {loading && <LoadingSpinner />}
        {error && (
          <p className="text-red-300 text-center mt-4 bg-red-900/20 py-2 rounded-xl">
            {error}
          </p>
        )}
        {displayWeather && !loading && <WeatherCard data={displayWeather} />}
      </div>
    </div>
  );
}
