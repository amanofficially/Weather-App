// ─── SearchBar.jsx ────────────────────────────────────────────────────────────
// Controlled form for city search input.
// Props: onSearch(cityName) — called with the city name when user submits
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react'

export default function SearchBar({ onSearch }) {

  // Local state for the input field value
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()    // stop page reload
    onSearch(value)       // send city name up to App.jsx
    setValue('')          // clear input after search
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Search city..."
        className="flex-1 px-4 py-3 rounded-xl outline-none text-gray-700 bg-white/90 backdrop-blur placeholder-gray-400"
      />
      <button
        type="submit"
        className="bg-white text-blue-600 px-5 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors"
      >
        Go
      </button>
    </form>
  )
}
