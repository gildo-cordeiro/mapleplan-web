"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"

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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enviar Documento</DialogTitle>
          <DialogDescription>Adicione um novo documento à sua coleção</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="doc-name">Nome do Documento *</Label>
            <Input
              id="doc-name"
              placeholder="Ex: Passaporte - Parceiro 1"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="category">Categoria *</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger id="category">
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
            <Label htmlFor="deadline">Prazo (opcional)</Label>
            <Input id="deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="file">Arquivo *</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-[var(--maple-primary)] transition-colors">
              <input
                id="file"
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.currentTarget.files?.[0] || null)}
                required
              />
              <label htmlFor="file" className="cursor-pointer flex flex-col items-center gap-2">
                <Upload className="w-8 h-8 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {file ? file.name : "Clique ou arraste um arquivo"}
                </span>
                <span className="text-xs text-muted-foreground">PDF, DOC, DOCX, JPG, PNG até 10MB</span>
              </label>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[var(--maple-primary)] hover:bg-[var(--maple-dark)]"
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
