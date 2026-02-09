import { CheckSquare2, Plane, MapPin, Home } from "lucide-react"
import { Button } from "@/components/ui/Button"

interface MasterChecklistHeaderProps {
  activePhase: string
  onPhaseChange: (phase: string) => void
}

const phases = [
  {
    value: "pre-departure",
    label: "Pré-Partida",
    icon: Plane,
  },
  {
    value: "arrival",
    label: "Chegada",
    icon: MapPin,
  },
  {
    value: "adaptation",
    label: "Adaptação",
    icon: Home,
  }
]

export function MasterChecklistHeader({ activePhase, onPhaseChange }: MasterChecklistHeaderProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Header with Icon */}
      <div className="flex items-start gap-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[var(--maple-primary)] to-[var(--maple-primary)]/70 shadow-xl shadow-[var(--maple-primary)]/30">
          <CheckSquare2 className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-foreground">Checklist Mestre</h1>
          <p className="text-sm text-muted-foreground mt-2">Organize sua jornada para o Canadá em fases</p>
        </div>
      </div>
    </div>
  )
}
