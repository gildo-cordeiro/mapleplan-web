"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Label } from "@/components/ui/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { onboardingService } from "@/services/onboardingService"

interface OnboardingModalProps {
  email: string
  onComplete: () => void
}

export default function OnboardingModal({ email, onComplete }: OnboardingModalProps) {
  const [partner1Name, setPartner1Name] = useState("")
  const [partner2Name, setPartner2Name] = useState("")
  const [immigrationGoal, setImmigrationGoal] = useState("")
  const [loading, setLoading] = useState(false)

  const handleComplete = async (e: React.SubmitEvent) => {
    e.preventDefault()

    if (!partner1Name || !immigrationGoal) {
      alert("Por favor, preencha todos os campos obrigatórios")
      return
    }

    setLoading(true)
    try {
      await onboardingService.completeOnboarding(email, partner1Name, partner2Name, immigrationGoal)
      onComplete()
    } catch (error) {
      alert("Ocorreu um erro ao completar o onboarding. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog defaultOpen>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Primeiros Passos</DialogTitle>
          <DialogDescription>Vamos organizar seu planejamento de imigração para o Canadá</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleComplete} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="partner1">Nome do Parceiro 1 *</Label>
            <Input
              id="partner1"
              placeholder="Seu nome"
              value={partner1Name}
              onChange={(e) => setPartner1Name(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="partner2">Nome do Parceiro 2</Label>
            <Input
              id="partner2"
              placeholder="Nome do seu parceiro (opcional)"
              value={partner2Name}
              onChange={(e) => setPartner2Name(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal">Objetivo de Imigração *</Label>
            <Select value={immigrationGoal} onValueChange={setImmigrationGoal}>
              <SelectTrigger id="goal" disabled={loading}>
                <SelectValue placeholder="Selecione um objetivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="permanent-residence">Residência Permanente</SelectItem>
                <SelectItem value="study">Estudo</SelectItem>
                <SelectItem value="work">Trabalho</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white" disabled={loading}>
            {loading ? "Iniciando..." : "Começar o Planejamento"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
