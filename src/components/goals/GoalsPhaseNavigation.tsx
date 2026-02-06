"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"

interface GoalsPhaseNavigationProps {
  activePhase: string
  onPhaseChange: (phase: string) => void
}

const phases = [
  { id: "pre-departure", label: "Pré-Partida" },
  { id: "arrival", label: "Chegada" },
  { id: "post-arrival", label: "Adaptação" },
]

export function GoalsPhaseNavigation({ activePhase, onPhaseChange }: GoalsPhaseNavigationProps) {
  return (
    <Tabs value={activePhase} onValueChange={onPhaseChange}>
      <TabsList className="grid w-full grid-cols-3">
        {phases.map((phase) => (
          <TabsTrigger key={phase.id} value={phase.id}>
            {phase.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={activePhase} className="mt-6" />
    </Tabs>
  )
}
