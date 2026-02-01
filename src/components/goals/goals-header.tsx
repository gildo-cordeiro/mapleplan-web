import { Target } from "lucide-react"

export function GoalsHeader() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-[var(--maple-primary)] bg-opacity-10">
          <Target className="w-6 h-6 text-[var(--maple-primary)]" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Metas de Imigração</h1>
          <p className="text-muted-foreground">Acompanhe os objetivos de sua jornada para o Canadá</p>
        </div>
      </div>
    </div>
  )
}
