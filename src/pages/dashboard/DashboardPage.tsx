import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/app/context/AuthContext"
import { useUserData } from "@/hooks/useUserData"
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import NextActionsWidget from '@/components/dashboard/widgets/NextActionsWidget'
import FinancialAlertWidget from '@/components/dashboard/widgets/FinancialAlertWidget'
import DocumentAlertWidget from '@/components/dashboard/widgets/DocumentAlertWidget'
import GoalsWidget from '@/components/dashboard/widgets/GoalsWidget'
import { Button } from "@/components/ui/Button"

export default function DashboardPage() {
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuth()
  const { user, loading, error } = useUserData()
  const [coupleNames, setCoupleNames] = useState({ partner1: "Gildo", partner2: "Jenny" })
  const [progress] = useState({
    currentPhase: "Fase 1: Pré-Partida",
    percentage: 0,
  })

  // Atualizar nomes do casal com os dados do usuário
  useEffect(() => {
    if (user) {
      setCoupleNames({
        partner1: user.name || "Usuário",
        partner2: user.partnerName || "Parceiro"
      })
    }
  }, [user])

  // Se não autenticado
  if (!isAuthenticated) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Acesso não autorizado</h2>
            <p className="text-gray-600">Por favor, faça login para acessar o dashboard</p>
            <div className="mt-4 flex justify-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  logout()
                  navigate('/login')
                }}
              >
                Fazer login novamente
              </Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  // Se carregando
  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Carregando dados do usuário...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  // Se há erro
  if (error) {
    const errorMessage = error.toLowerCase().includes('token')
      ? 'Sessao expirada ou invalida. Faca login novamente.'
      : error
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center text-red-600">
            <h2 className="text-2xl font-bold mb-2">Erro ao carregar dados</h2>
            <p>{errorMessage}</p>
            <div className="mt-4 flex justify-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  logout()
                  navigate('/login')
                }}
              >
                Fazer login novamente
              </Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        <DashboardHeader couple={coupleNames} progress={progress} />

        <div className="px-4 py-8 md:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <NextActionsWidget />
              <GoalsWidget />
            </div>

            <div className="space-y-6">
              <FinancialAlertWidget />
              <DocumentAlertWidget />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
