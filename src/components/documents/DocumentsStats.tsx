import type React from "react"
import { Card } from "@/components/ui/Card"
import { CheckCircle2, AlertCircle, Clock, FileText } from "lucide-react"

interface StatItem {
  label: string
  value: number
  icon: React.ReactNode
  color: string
  bgColor: string
}

export function DocumentsStats() {
  const stats: StatItem[] = [
    {
      label: "Completos",
      value: 12,
      icon: <CheckCircle2 className="w-5 h-5" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Pendentes",
      value: 8,
      icon: <Clock className="w-5 h-5" />,
      color: "text-[var(--maple-accent)]",
      bgColor: "bg-yellow-50",
    },
    {
      label: "Vencidos",
      value: 2,
      icon: <AlertCircle className="w-5 h-5" />,
      color: "text-[var(--maple-primary)]",
      bgColor: "bg-red-50",
    },
    {
      label: "Total",
      value: 22,
      icon: <FileText className="w-5 h-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4 border-0 shadow-sm">
          <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center mb-3`}>
            <span className={stat.color}>{stat.icon}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
        </Card>
      ))}
    </div>
  )
}
