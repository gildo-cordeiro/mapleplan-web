import { Progress } from "@/components/ui/progress"

interface DashboardHeaderProps {
  couple: { partner1: string; partner2: string }
  progress: { currentPhase: string; percentage: number }
}

export default function DashboardHeader({ couple, progress }: DashboardHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-[#dc143c] to-[#ff6347] text-white shadow-lg">
      <div className="px-4 py-8 md:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">
          Bem-vindos, {couple.partner1} e {couple.partner2}! 🍁
        </h1>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Jornada de Imigração</h2>
            <span className="text-sm font-medium">{progress.percentage}%</span>
          </div>
          <Progress value={progress.percentage} className="h-3 bg-white/30" />
          <p className="text-sm opacity-90">{progress.currentPhase}</p>
        </div>
      </div>
    </div>
  )
}
