export default function MapleIcon() {
  return (
    <div className="flex items-center gap-3">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Maple Leaf */}
        <path
          d="M20 2L24 12L35 10L28 18L36 26L24 24L26 36L20 30L14 36L16 24L4 26L12 18L5 10L16 12L20 2Z"
          fill="#FFFFFF"
        />
      </svg>
      <div>
        <h2 className="text-xl font-bold text-white">MaplePlan</h2>
        <p className="text-xs text-green-100">Planejamento Compartilhado</p>
      </div>
    </div>
  )
}
