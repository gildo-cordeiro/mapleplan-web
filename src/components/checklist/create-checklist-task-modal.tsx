import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface CreateChecklistTaskModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateChecklistTaskModal({ isOpen, onOpenChange }: CreateChecklistTaskModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dueDate: "",
    assignedTo: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.assignedTo || !formData.dueDate) {
      alert("Por favor, preencha todos os campos obrigatórios")
      return
    }
    // Handle form submission
    console.log("New task:", formData)
    setFormData({ name: "", description: "", dueDate: "", assignedTo: "" })
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nova Tarefa</DialogTitle>
          <DialogDescription>Crie uma nova tarefa para adicionar ao seu checklist</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="task-name" className="text-sm font-medium">
              Nome da Tarefa *
            </Label>
            <Input
              id="task-name"
              placeholder="Ex: Obter Laudo Médico"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="task-description" className="text-sm font-medium">
              Descrição
            </Label>
            <Textarea
              id="task-description"
              placeholder="Detalhe a tarefa..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 resize-none"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="task-due-date" className="text-sm font-medium">
              Data Limite *
            </Label>
            <Input
              id="task-due-date"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="task-assigned" className="text-sm font-medium">
              Atribuir ao Parceiro *
            </Label>
            <Select
              value={formData.assignedTo}
              onValueChange={(value) => setFormData({ ...formData, assignedTo: value })}
            >
              <SelectTrigger id="task-assigned" className="mt-1">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="partner1">Parceiro 1</SelectItem>
                <SelectItem value="partner2">Parceiro 2</SelectItem>
                <SelectItem value="shared">Compartilhada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#dc143c] hover:bg-[#8b4513] text-white">
              Criar Tarefa
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
