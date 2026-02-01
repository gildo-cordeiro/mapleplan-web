import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs"

interface MasterChecklistHeaderProps {
  activePhase: string
  onPhaseChange: (phase: string) => void
}

export function MasterChecklistHeader({ activePhase, onPhaseChange }: MasterChecklistHeaderProps) {
  return (
    <div className="flex flex-col gap-4 pb-4 border-b border-border">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Checklist Mestre</h1>
        <p className="text-sm text-muted-foreground mt-1">Organize sua jornada para o Canadá em fases</p>
      </div>

      <Tabs value={activePhase} onValueChange={onPhaseChange} className="w-full">
        <TabsList className="grid w-full max-w-4xl grid-cols-3 bg-secondary mx-auto">
          <TabsTrigger
            value="pre-departure"
            className="data-[state=active]:bg-[#dc143c] data-[state=active]:text-white"
          >
            Pré-Partida
          </TabsTrigger>
          <TabsTrigger value="arrival" className="data-[state=active]:bg-[#dc143c] data-[state=active]:text-white">
            Chegada
          </TabsTrigger>
          <TabsTrigger value="adaptation" className="data-[state=active]:bg-[#dc143c] data-[state=active]:text-white">
            Adaptação
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
