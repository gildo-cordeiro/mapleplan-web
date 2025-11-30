"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface DocumentsFiltersProps {
  filterStatus: string
  onFilterStatusChange: (status: string) => void
  filterCategory: string
  onFilterCategoryChange: (category: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
}

export function DocumentsFilters({
  filterStatus,
  onFilterStatusChange,
  filterCategory,
  onFilterCategoryChange,
  sortBy,
  onSortChange,
}: DocumentsFiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar documentos..." className="pl-10" />
        </div>

        {/* Filters */}
        <Select value={filterStatus} onValueChange={onFilterStatusChange}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="pending">Pendentes</SelectItem>
            <SelectItem value="completed">Completos</SelectItem>
            <SelectItem value="expired">Vencidos</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterCategory} onValueChange={onFilterCategoryChange}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="identification">Identificação</SelectItem>
            <SelectItem value="financial">Financeiro</SelectItem>
            <SelectItem value="medical">Médico</SelectItem>
            <SelectItem value="employment">Empregatício</SelectItem>
            <SelectItem value="education">Educação</SelectItem>
            <SelectItem value="other">Outro</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Ordenar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="deadline">Prazo</SelectItem>
            <SelectItem value="status">Status</SelectItem>
            <SelectItem value="name">Nome</SelectItem>
            <SelectItem value="recent">Recentes</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
