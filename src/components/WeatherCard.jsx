// ─── WeatherCard.jsx ──────────────────────────────────────────────────────────
// Displays the fetched weather data in a glassmorphism-style card.
// Props: data — the weather object returned by OpenWeatherMap API
//   data.name          — city name
//   data.sys.country   — country code (e.g. "IN")
//   data.main.temp     — temperature in Celsius
//   data.weather[0]    — { description, icon }
//   data.wind.speed    — wind speed in m/s
// ─────────────────────────────────────────────────────────────────────────────

export default function WeatherCard({ data }) {
  // Build the weather icon URL from the icon code in the API response
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    // bg-white/20 + backdrop-blur = glassmorphism effect
    <div className="mt-6 bg-white/20 backdrop-blur rounded-3xl p-6 text-white">
      {/* City name, country, and weather icon */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {data.name}, {data.sys.country}
          </h2>
          <p className="text-white/80 capitalize">
            {data.weather[0].description}
          </p>
        </div>
        <img src={iconUrl} alt="weather icon" className="w-16 h-16" />
      </div>

      {/* Large temperature display */}
      <div className="text-7xl font-thin my-4">
        {Math.round(data.main.temp)}°C
      </div>
      <p className="text-white/70 text-sm">
        Feels like {Math.round(data.main.feels_like)}°C
      </p>

      {/* Stats grid: humidity, wind, pressure */}
      <div className="grid grid-cols-3 gap-3 mt-5">
        {[
          { label: "Humidity", value: `${data.main.humidity}%` },
          { label: "Wind", value: `${data.wind.speed} m/s` },
          { label: "Pressure", value: `${data.main.pressure} hPa` },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white/10 rounded-2xl p-3 text-center">
            <p className="text-white/60 text-xs">{label}</p>
            <p className="font-semibold text-sm mt-1">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
