// ─── LoadingSpinner.jsx ───────────────────────────────────────────────────────
// Animated spinning circle shown while the API request is in progress.
// Tailwind: animate-spin rotates the element continuously.
// The border trick: full border is white/30 (transparent), top border is white (visible).
// ─────────────────────────────────────────────────────────────────────────────

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center mt-8">
      {/* Spinning border circle */}
      <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
    </div>
  )
}
