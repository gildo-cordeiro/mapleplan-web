"use client"

interface FinancesHeaderProps {
  couple: { partner1: string; partner2: string }
}

export default function FinancesHeader({ couple }: FinancesHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-[#dc143c] to-[#ff6347] text-white shadow-lg">
      <div className="px-4 py-8 md:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-2">Gestão Financeira {couple.partner1} e {couple.partner2}! 🍁</h1>
        <p className="text-sm opacity-90">Acompanhe os gastos e planeje o orçamento para sua jornada ao Canadá</p>
      </div>
    </div>
  )
}
