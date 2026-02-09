"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Label } from "@/components/ui/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { onboardingService } from "@/services/onboardingService"
import { AlertCircle, Sparkles } from "lucide-react"
import { Alert, AlertDescription } from "../ui/Alert"
import { PartnerSelect } from "./PartnerSelect"

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
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-800 dark:to-slate-800/50 border-0 shadow-md">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[var(--maple-primary)]/0 to-[var(--maple-primary)]/0 rounded-lg" />
        <DialogHeader className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-gradient-to-br from-[var(--maple-primary)] to-[var(--maple-primary)]/70 shadow-lg shadow-[var(--maple-primary)]/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold">Primeiros Passos</DialogTitle>
              <DialogDescription className="text-sm">Vamos organizar seu planejamento de imigração para o Canadá</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleComplete} className="space-y-5 relative z-10">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-semibold text-foreground">Primeiro Nome *</Label>
            <Input
              id="firstName"
              placeholder="Seu primeiro nome"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={loading}
              className="border-slate-200 dark:border-slate-700 focus:border-[var(--maple-primary)] transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-semibold text-foreground">Sobrenome *</Label>
            <Input
              id="lastName"
              placeholder="Seu sobrenome"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={loading}
              className="border-slate-200 dark:border-slate-700 focus:border-[var(--maple-primary)] transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal" className="text-sm font-semibold text-foreground">Objetivo de Imigração *</Label>
            <Select value={immigrationGoal} onValueChange={setImmigrationGoal}>
              <SelectTrigger id="goal" disabled={loading} className="border-slate-200 dark:border-slate-700 focus:border-[var(--maple-primary)] transition-all duration-300">
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

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-[var(--maple-primary)] to-[var(--maple-dark)] hover:shadow-lg hover:shadow-[var(--maple-primary)]/30 text-white rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" 
            disabled={loading}
          >
            {loading ? "Iniciando..." : "Começar o Planejamento"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
