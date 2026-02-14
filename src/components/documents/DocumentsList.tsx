"use client"

import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { CheckCircle2, AlertCircle, Clock, Download, Trash2, Eye, MoreVertical } from "lucide-react"
import { Badge } from "@/components/ui/Badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu"
import { formatDistanceToNow } from "date-fns"
import { pt } from "date-fns/locale"

interface Document {
  id: string
  name: string
  category: string
  status: "pending" | "completed" | "expired"
  deadline: Date
  uploadedBy: string
  uploadedDate: Date
  fileSize: string
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Passaporte - Parceiro 1",
    category: "identification",
    status: "completed",
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    uploadedBy: "João",
    uploadedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    fileSize: "2.4 MB",
  },
  {
    id: "2",
    name: "Comprovante de Renda - Parceiro 2",
    category: "financial",
    status: "pending",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    uploadedBy: "Maria",
    uploadedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    fileSize: "1.8 MB",
  },
  {
    id: "3",
    name: "Laudo Médico - Parceiro 1",
    category: "medical",
    status: "expired",
    deadline: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    uploadedBy: "João",
    uploadedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    fileSize: "3.1 MB",
  },
]

function getStatusBadge(status: Document["status"]) {
  const statusConfig = {
    completed: {
      icon: <CheckCircle2 className="w-4 h-4" />,
      label: "Completo",
      className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    },
    pending: {
      icon: <Clock className="w-4 h-4" />,
      label: "Pendente",
      className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    },
    expired: {
      icon: <AlertCircle className="w-4 h-4" />,
      label: "Vencido",
      className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    },
  }

  const config = statusConfig[status]
  return (
    <Badge variant="outline" className={`text-xs ${config.className}`}>
      <span className="mr-1">{config.icon}</span>
      {config.label}
    </Badge>
  )
}

interface DocumentsListProps {
  status: string
  category: string
  sortBy: string
}

export function DocumentsList({ status: filterStatus, category: filterCategory, sortBy }: DocumentsListProps) {
  const filteredDocuments = mockDocuments.filter((doc) => {
    const statusMatch = filterStatus === "all" || doc.status === filterStatus
    const categoryMatch = filterCategory === "all" || doc.category === filterCategory
    return statusMatch && categoryMatch
  })

  return (
    <div className="flex flex-col gap-3">
      {filteredDocuments.length === 0 ? (
        <Card className="border-0 bg-gradient-to-br from-[var(--surface-1)] to-[var(--surface-2)] shadow-md">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Nenhum documento encontrado</p>
          </CardContent>
        </Card>
      ) : (
        filteredDocuments.map((doc) => (
          <Card
            key={doc.id}
            className="border-0 bg-gradient-to-br from-[var(--surface-1)] to-[var(--surface-2)] shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[var(--maple-primary)]/0 to-[var(--maple-primary)]/0 group-hover:from-[var(--maple-primary)]/5 group-hover:to-[var(--maple-primary)]/0 transition-all duration-300 rounded-lg" />
            <CardContent className="p-5 relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-semibold text-foreground">{doc.name}</h3>
                    {getStatusBadge(doc.status)}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">Categoria</p>
                      <p className="text-foreground">{doc.category}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">Prazo</p>
                      <p className="text-foreground">
                        {formatDistanceToNow(doc.deadline, {
                          addSuffix: true,
                          locale: pt,
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">Enviado por</p>
                      <p className="text-foreground">{doc.uploadedBy}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">Tamanho</p>
                      <p className="text-foreground">{doc.fileSize}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="shrink-0">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2">
                      <Eye className="w-4 h-4" />
                      Visualizar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Download className="w-4 h-4" />
                      Baixar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-red-600">
                      <Trash2 className="w-4 h-4" />
                      Remover
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
