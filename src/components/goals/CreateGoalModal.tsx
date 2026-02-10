"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Textarea } from "@/components/ui/Textarea"
import { useAuth } from "@/app/context/AuthContext"
import { Goal } from "@/types"
import { CreateGoal, GoalsPhase, GoalsPriority, GoalStatus } from "@/types/goals"
import { goalService } from "@/services/goalService"
import { Target } from "lucide-react"

interface CreateGoalModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onCreated?: () => void
}

const initialFormData: CreateGoal = {
  title: "",
  description: "",
  status: GoalStatus.NOT_STARTED,
  phase: GoalsPhase.PRE_DEPARTURE,
  priority: GoalsPriority.MEDIUM,
  dueDate: "",
  progress: 0,
  assignedToUser: null,
  assignedToCouple: null
}

export function CreateGoalModal({ isOpen, onOpenChange, onCreated }: CreateGoalModalProps) {
  const { token, user } = useAuth()
  const [formData, setFormData] = useState<CreateGoal>(initialFormData)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const userId = user?.id ?? ""
  const partnerId = user?.partnerId ?? ""
  const coupleId = user?.coupleId ?? ""
  const hasPartner = Boolean(partnerId)
  const userLabel = user?.firstName ? `Eu (${user.firstName})` : "Eu"
  const partnerName = user?.partnerFirstName ?? "Parceiro(a)"
  const partnerLabel = `Parceiro(a) (${partnerName})`

  useEffect(() => {
    if (userId && !formData.assignedToUser) {
      setFormData((prev) => ({ ...prev, assignedToUser: userId }))
    }
  }, [userId, formData.assignedToUser])

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    if (!token) return

    const isAmboSelected = formData.assignedToCouple === coupleId

    const goalData = {
      ...formData,
      assignedToUser: isAmboSelected ? userId : formData.assignedToUser,
      assignedToCouple: isAmboSelected ? coupleId : null
    }

    if (!goalData.title || !goalData.phase || (!goalData.assignedToUser && !goalData.assignedToCouple)) {
      setError("Por favor, preencha os campos obrigatórios")
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      await goalService.createGoal(token, goalData)
      onCreated?.()
      setFormData(initialFormData)
    } catch (submitError) {
      console.error("Erro ao criar meta:", submitError)
      setError("Não foi possível criar a meta. Tente novamente.")
    } finally {
      setSubmitting(false)
    }

    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-800 dark:to-slate-800/50 border-0 shadow-md">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[var(--maple-primary)]/0 to-[var(--maple-primary)]/0 rounded-lg" />
        <DialogHeader className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-gradient-to-br from-[var(--maple-primary)] to-[var(--maple-primary)]/70 shadow-lg shadow-[var(--maple-primary)]/30">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold">Criar Nova Meta</DialogTitle>
              <DialogDescription className="text-sm">Defina uma nova meta para sua jornada</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          {error ? (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold text-foreground">Título da Meta *</Label>
            <Input
              id="title"
              placeholder="Ex: Passar no IELTS"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="border-slate-200 dark:border-slate-700 focus:border-[var(--maple-primary)] transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold text-foreground">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Detalhe sua meta..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="border-slate-200 dark:border-slate-700 focus:border-[var(--maple-primary)] transition-all duration-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate" className="text-sm font-semibold text-foreground">Prazo Final</Label>
              <Input
                id="dueDate"
                type="datetime-local"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="border-slate-200 dark:border-slate-700 focus:border-[var(--maple-primary)] transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority" className="text-sm font-semibold text-foreground">Prioridade</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value as GoalsPriority })}
              >
                <SelectTrigger id="priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phase" className="text-sm font-semibold text-foreground">Fase *</Label>
              <Select
                value={formData.phase}
                onValueChange={(value) => setFormData({ ...formData, phase: value as GoalsPhase })}
              >
                <SelectTrigger id="phase" className="border-slate-200 dark:border-slate-700 focus:border-[var(--maple-primary)] transition-all duration-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={GoalsPhase.PRE_DEPARTURE}>Pré-Partida</SelectItem>
                  <SelectItem value={GoalsPhase.ARRIVAL}>Chegada</SelectItem>
                  <SelectItem value={GoalsPhase.POST_ARRIVAL}>Adaptação</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignedTo" className="text-sm font-semibold text-foreground">Atribuir a *</Label>
              <Select
                value={formData.assignedToCouple === coupleId ? coupleId : formData.assignedToUser || ""}
                onValueChange={(value) => {
                  if (value === coupleId) {
                    setFormData({ ...formData, assignedToCouple: coupleId, assignedToUser: userId })
                  } else {
                    setFormData({ ...formData, assignedToUser: value, assignedToCouple: null })
                  }
                }}
              >
                <SelectTrigger id="assignedTo" className="border-slate-200 dark:border-slate-700 focus:border-[var(--maple-primary)] transition-all duration-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={userId}>{userLabel}</SelectItem>
                  {hasPartner ? <SelectItem value={partnerId}>{partnerLabel}</SelectItem> : null}
                  {coupleId ? <SelectItem value={coupleId}>Ambos</SelectItem> : null}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[var(--maple-primary)] hover:bg-[var(--maple-dark)]"
              disabled={submitting}
            >
              {submitting ? "Criando..." : "Criar Meta"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
