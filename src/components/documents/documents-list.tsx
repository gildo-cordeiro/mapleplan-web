"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, AlertCircle, Clock, Download, Trash2, Eye, MoreVertical } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
      className: "bg-green-50 text-green-700 hover:bg-green-100",
    },
    pending: {
      icon: <Clock className="w-4 h-4" />,
      label: "Pendente",
      className: "bg-yellow-50 text-yellow-700 hover:bg-yellow-100",
    },
    expired: {
      icon: <AlertCircle className="w-4 h-4" />,
      label: "Vencido",
      className: "bg-red-50 text-[var(--maple-primary)] hover:bg-red-100",
    },
  }

  const config = statusConfig[status]
  return (
    <Badge variant="outline" className={config.className}>
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
        <Card className="p-8 text-center border-0 shadow-sm">
          <p className="text-muted-foreground">Nenhum documento encontrado</p>
        </Card>
      ) : (
        filteredDocuments.map((doc) => (
          <Card key={doc.id} className="p-4 border-0 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-foreground">{doc.name}</h3>
                  {getStatusBadge(doc.status)}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                  <div>
                    <p className="text-xs font-medium text-foreground mb-1">Categoria</p>
                    <p>{doc.category}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground mb-1">Prazo</p>
                    <p>
                      {formatDistanceToNow(doc.deadline, {
                        addSuffix: true,
                        locale: pt,
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground mb-1">Enviado por</p>
                    <p>{doc.uploadedBy}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground mb-1">Tamanho</p>
                    <p>{doc.fileSize}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
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
          </Card>
        ))
      )}
    </div>
  )
}
