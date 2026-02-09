import { Progress } from "@/components/ui/Progress"
import { Trophy } from "lucide-react"

interface DashboardHeaderProps {
  couple?: { partner1: string | undefined; partner2: string | undefined }
  progress: { currentPhase: string; percentage: number }
}

export default function DashboardHeader({ couple, progress }: DashboardHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-[var(--maple-primary)] via-[var(--maple-primary)]/90 to-[var(--maple-dark)] text-white shadow-lg dark:shadow-[var(--maple-primary)]/30 border-b border-[var(--maple-primary)]/20">
      <div className="px-4 py-8 md:px-6 lg:px-8">
        <div className="flex items-center gap-5 mb-6">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/20 shadow-xl shadow-black/20">
            <Trophy className="w-7 h-7 text-white" />
          </div>
          <div>
            {
              couple && couple.partner1 && couple.partner2 ? (
                <h1 className="text-4xl font-black text-white mb-1">
                  Bem-vindos, {couple.partner1} & {couple.partner2}!
                </h1>
              ) : (
                <h1 className="text-4xl font-black text-white mb-1">
                  Bem-vindo(a)!
                </h1>
              )
            }
            <p className="text-white/80 text-sm">Acompanhe sua jornada de imigração</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white/95">Jornada de Imigração</h2>
              <p className="text-sm text-white/70 mt-1">{progress.currentPhase}</p>
            </div>
            <span className="text-3xl font-black text-white">{progress.percentage}%</span>
          </div>
          <Progress value={progress.percentage} className="h-2 bg-white/20 rounded-full overflow-hidden shadow-lg" />
        </div>
      </div>
    </div>
  )
}
