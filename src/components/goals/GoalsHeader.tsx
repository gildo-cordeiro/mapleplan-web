import { Target } from "lucide-react"

export function GoalsHeader() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-5">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[var(--maple-primary)] to-[var(--maple-primary)]/70 shadow-xl shadow-[var(--maple-primary)]/30">
          <Target className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <h1 className="text-5xl font-black bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              Metas
            </h1>
            <p className="text-sm font-semibold text-muted-foreground">de Imigração</p>
          </div>
          <p className="text-sm text-muted-foreground mt-2 font-medium">
            Acompanhe e complete seus objetivos para a jornada ao Canadá
          </p>
        </div>
      </div>
    </div>
  )
}
