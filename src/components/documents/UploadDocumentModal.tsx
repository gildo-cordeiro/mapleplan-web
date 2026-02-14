"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Upload, FileIcon } from "lucide-react"

interface UploadDocumentModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function UploadDocumentModal({ isOpen, onOpenChange }: UploadDocumentModalProps) {
  const [documentName, setDocumentName] = useState("")
  const [category, setCategory] = useState("")
  const [deadline, setDeadline] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle document upload
    onOpenChange(false)
    setDocumentName("")
    setCategory("")
    setDeadline("")
    setFile(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-[var(--surface-1)] to-[var(--surface-2)] border-0 shadow-md">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[var(--maple-primary)]/0 to-[var(--maple-primary)]/0 rounded-lg" />
        <DialogHeader className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-gradient-to-br from-[var(--maple-primary)] to-[var(--maple-primary)]/70 shadow-lg shadow-[var(--maple-primary)]/30">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold">Enviar Documento</DialogTitle>
              <DialogDescription className="text-sm">Adicione um novo documento à sua coleção</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
          <div className="flex flex-col gap-2">
            <Label htmlFor="doc-name" className="text-sm font-semibold text-foreground">Nome do Documento *</Label>
            <Input
              id="doc-name"
              placeholder="Ex: Passaporte - Parceiro 1"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              required
              className="border-slate-200 dark:border-slate-700 focus:border-[var(--maple-primary)] transition-all duration-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="category" className="text-sm font-semibold text-foreground">Categoria *</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger id="category" className="border-slate-200 dark:border-slate-700 focus:border-[var(--maple-primary)] transition-all duration-300">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="identification">Identificação</SelectItem>
                <SelectItem value="financial">Financeiro</SelectItem>
                <SelectItem value="medical">Médico</SelectItem>
                <SelectItem value="employment">Empregatício</SelectItem>
                <SelectItem value="education">Educação</SelectItem>
                <SelectItem value="other">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="deadline" className="text-sm font-semibold text-foreground">Prazo (opcional)</Label>
            <Input 
              id="deadline" 
              type="date" 
              value={deadline} 
              onChange={(e) => setDeadline(e.target.value)}
              className="border-slate-200 dark:border-slate-700 focus:border-[var(--maple-primary)] transition-all duration-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="file" className="text-sm font-semibold text-foreground">Arquivo *</Label>
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 text-center cursor-pointer hover:border-[var(--maple-primary)] dark:hover:border-[var(--maple-primary)] hover:bg-gradient-to-br hover:from-[var(--maple-primary)]/5 to-transparent transition-all duration-300 group">
              <input
                id="file"
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.currentTarget.files?.[0] || null)}
                required
              />
              <label htmlFor="file" className="cursor-pointer flex flex-col items-center gap-2">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[var(--maple-primary)]/10 to-[var(--maple-primary)]/5 dark:from-[var(--maple-primary)]/20 dark:to-[var(--maple-primary)]/10 group-hover:from-[var(--maple-primary)]/20 group-hover:to-[var(--maple-primary)]/10 transition-all duration-300">
                  <Upload className="w-8 h-8 text-[var(--maple-primary)] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {file ? (
                    <div className="flex items-center gap-2">
                      <FileIcon className="w-4 h-4" />
                      {file.name}
                    </div>
                  ) : (
                    "Clique ou arraste um arquivo"
                  )}
                </span>
                <span className="text-xs text-muted-foreground">PDF, DOC, DOCX, JPG, PNG até 10MB</span>
              </label>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)} 
              className="flex-1 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[var(--maple-primary)] to-[var(--maple-dark)] hover:shadow-lg hover:shadow-[var(--maple-primary)]/30 text-white rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!documentName || !category || !file}
            >
              Enviar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
