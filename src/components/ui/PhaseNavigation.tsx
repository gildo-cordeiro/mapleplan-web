"use client"

import { Button } from "@/components/ui/Button"
import { Plane, MapPin, Home } from "lucide-react"

interface PhaseNavigationProps {
  activePhase: string
  onPhaseChange: (phase: string) => void
}

const phases = [
  { id: "pre-departure", label: "Pré-Partida", icon: Plane },
  { id: "arrival", label: "Chegada", icon: MapPin },
  { id: "post-arrival", label: "Adaptação", icon: Home },
]

export function PhaseNavigation({ activePhase, onPhaseChange }: PhaseNavigationProps) {
  return (
    <div className="flex gap-3 border-b border-slate-200 dark:border-slate-700">
      {phases.map((phase) => {
        const Icon = phase.icon
        const isActive = activePhase === phase.id
        
        return (
          <Button
            key={phase.id}
            onClick={() => onPhaseChange(phase.id)}
            variant="ghost"
            size="sm"
            className={`flex items-center gap-2 pb-3 px-4 rounded-none border-b-2 transition-all duration-300 ${
              isActive
                ? "border-[var(--maple-primary)] text-[var(--maple-primary)] font-semibold"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{phase.label}</span>
          </Button>
        )
      })}
    </div>
  )
}
