import { FileText } from "lucide-react"

export function DocumentsHeader() {
  return (
    <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 rounded-lg bg-[var(--maple-primary)] flex items-center justify-center">
        <FileText className="w-6 h-6 text-white" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-foreground">Documentação</h1>
        <p className="text-muted-foreground">Organize e acompanhe todos os documentos necessários para sua imigração</p>
      </div>
    </div>
  )
}
