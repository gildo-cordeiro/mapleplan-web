"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Label } from "@/components/ui/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { onboardingService } from "@/services/onboardingService"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "../ui/Alert"
import { PartnerSelect } from "../onboarding/PartnerSelect"

interface OnboardingModalProps {
  email: string
  onComplete: () => void
}

export default function OnboardingModal({ email, onComplete }: OnboardingModalProps) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [immigrationGoal, setImmigrationGoal] = useState("")
  const [partnerEmail, setPartnerEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [partnerSearch, setPartnerSearch] = useState("")
  const [partnerSearchError, setPartnerSearchError] = useState("")
  const [error, setError] = useState("")

  const handlePartnerSearch = async (searchTerm: string) => {
    setPartnerSearchError("")
    try {
      const results = await onboardingService.searchPartners(searchTerm)
      if (results.length === 0) {
        setPartnerSearchError("Nenhum parceiro encontrado")
      }
      return results
    } catch (searchError) {
      setPartnerSearchError("Erro ao buscar parceiro. Tente novamente.")
      return []
    }
  }

  const handleComplete = async (e: React.SubmitEvent) => {
    e.preventDefault()

    if (!firstName || !lastName || !immigrationGoal) {
      setError("Por favor, preencha todos os campos obrigatórios")
      return
    }
    setError("")

    setLoading(true)
    try {
      await onboardingService.completeOnboarding(email,
        firstName,
        lastName,
        immigrationGoal,
        partnerEmail
      )
      onComplete()
    } catch (error) {
      setError("Ocorreu um erro ao completar o onboarding. Tente novamente.")
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
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="firstName">Primeiro Nome *</Label>
            <Input
              id="firstName"
              placeholder="Seu primeiro nome"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Sobrenome *</Label>
            <Input
              id="lastName"
              placeholder="Seu sobrenome"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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

          <PartnerSelect
            valueLabel={partnerSearch}
            loading={loading}
            error={partnerSearchError}
            onSearch={handlePartnerSearch}
            onSelect={(partner) => {
              setPartnerEmail(partner.email)
              setPartnerSearch(partner.name)
              setPartnerSearchError("")
            }}
          />

          <Button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white" disabled={loading}>
            {loading ? "Iniciando..." : "Começar o Planejamento"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
