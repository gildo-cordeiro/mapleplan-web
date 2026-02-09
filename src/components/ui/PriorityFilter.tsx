import { Button } from "@/components/ui/Button"

interface PriorityOption {
  value: string
  label: string
  color: string
  activeColor?: string
}

interface PriorityFilterProps {
  value: string
  onChange: (value: string) => void
  options?: PriorityOption[]
  title?: string
}

const defaultOptions: PriorityOption[] = [
  { value: "all", label: "Todas", color: "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700" },
  { value: "urgent", label: "Urgente", color: "bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800", activeColor: "from-red-600 to-red-700" },
  { value: "normal", label: "Normal", color: "bg-amber-100 hover:bg-amber-200 dark:bg-amber-900 dark:hover:bg-amber-800", activeColor: "from-amber-600 to-amber-700" }
]

export function PriorityFilter({ 
  value, 
  onChange, 
  options = defaultOptions,
  title = "Filtrar por prioridade" 
}: PriorityFilterProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Button
            key={option.value}
            variant={value === option.value ? "default" : "outline"}
            size="sm"
            onClick={() => onChange(option.value)}
            className={`text-xs font-medium transition-all duration-200 border-0 ${
              value === option.value
                ? `bg-gradient-to-r ${option.activeColor || "from-amber-600 to-amber-700"} text-white shadow-lg shadow-amber-200 dark:shadow-amber-900/50 scale-105`
                : `${option.color} text-foreground`
            }`}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
