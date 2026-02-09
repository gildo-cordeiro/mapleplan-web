import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/app/context/AuthContext"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Label } from "@/components/ui/Label"
import { AlertCircle, Eye, EyeOff } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/Alert"
import { authService } from "@/services/authService"

interface LoginFormProps {
  onAccountCreated?: (email: string) => void
}

export default function LoginForm({ onAccountCreated }: LoginFormProps) {
  const navigate = useNavigate()
  const { fetchUser } = useAuth()
  const [activeTab, setActiveTab] = useState("login")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignUp = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setError("")

    if (!signupEmail || !signupPassword || !confirmPassword) {
      setError("Por favor, preencha todos os campos")
      return
    }

    if (signupPassword !== confirmPassword) {
      setError("As senhas não coincidem")
      return
    }

    if (signupPassword.length < 8) {
      setError("A senha deve ter no mínimo 8 caracteres")
      return
    }

    setLoading(true)
    try {
      const response = await authService.signUp(signupEmail, signupPassword)
      // Signup: chama callback para abrir modal de onboarding
      onAccountCreated?.(response.user.email)
      setSignupEmail("")
      setSignupPassword("")
      setConfirmPassword("")
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        "Erro ao criar a conta. Tente novamente."
      )
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setError("")

    if (!loginEmail || !loginPassword) {
      setError("Por favor, preencha todos os campos")
      return
    }

    setLoading(true)
    try {
      await authService.login(loginEmail, loginPassword)
      await fetchUser()
      navigate("/dashboard")
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        (err instanceof Error ? err.message : null) ||
        "Erro ao fazer login. Tente novamente."
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!loginEmail) {
      setError("Por favor, insira seu email")
      return
    }
    try {
      await authService.forgotPassword(loginEmail)
      setError("")
      alert("Link de recuperação enviado para " + loginEmail)
    } catch (err: any) {
      setError("Erro ao enviar link. Tente novamente.")
    }
  }

  return (
    <Card className="border-0 bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-800 dark:to-slate-800/50 shadow-md hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300 rounded-2xl group overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[var(--maple-primary)]/0 to-[var(--maple-primary)]/0 group-hover:from-[var(--maple-primary)]/5 group-hover:to-[var(--maple-primary)]/0 transition-all duration-300 rounded-2xl" />
      <CardHeader className="space-y-1 pb-4 relative z-10">
        <CardTitle className="text-2xl font-bold">Bem-vindo ao MaplePlan</CardTitle>
        <CardDescription className="text-sm">Organize seu plano de imigração compartilhado</CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-8 pt-2 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 gap-2 bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-800 rounded-lg p-1">
            <TabsTrigger value="login" className="py-2 rounded-lg transition-all duration-300 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">Entrar</TabsTrigger>
            <TabsTrigger value="signup" className="py-2 rounded-lg transition-all duration-300 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">Criar Conta</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login" className="space-y-4 mt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {error && activeTab === "login" && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-sm font-semibold">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  disabled={loading}
                  className="h-10 border-slate-200 dark:border-slate-700 focus:border-[var(--maple-primary)] transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-sm font-semibold">Senha</Label>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    disabled={loading}
                    className="h-10 pr-10 border-slate-200 dark:border-slate-700 focus:border-[var(--maple-primary)] transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-[var(--maple-primary)] hover:text-[var(--maple-dark)] font-medium transition-colors duration-300"
                >
                  Esqueci a senha
                </button>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[var(--maple-primary)] to-[var(--maple-dark)] hover:shadow-lg hover:shadow-[var(--maple-primary)]/30 text-white h-10 rounded-lg font-semibold transition-all duration-300"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </TabsContent>

          {/* Sign Up Tab */}
          <TabsContent value="signup" className="space-y-4 mt-6">
            <form onSubmit={handleSignUp} className="space-y-4">
              {error && activeTab === "signup" && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-sm font-semibold">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  disabled={loading}
                  className="h-10 border-slate-200 dark:border-slate-700 focus:border-[var(--maple-primary)] transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-sm font-semibold">Senha</Label>
                <div className="relative">
                  <Input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    disabled={loading}
                    className="h-10 pr-10 border-slate-200 dark:border-slate-700 focus:border-[var(--maple-primary)] transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-sm font-semibold">Confirmar Senha</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                    className="h-10 pr-10 border-slate-200 dark:border-slate-700 focus:border-[var(--maple-primary)] transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[var(--maple-primary)] to-[var(--maple-dark)] hover:shadow-lg hover:shadow-[var(--maple-primary)]/30 text-white h-10 rounded-lg font-semibold transition-all duration-300"
                disabled={loading}
              >
                {loading ? "Criando Conta..." : "Criar Conta Compartilhada"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Ao criar uma conta, você concorda com nossos{" "}
                <a href="#" className="text-[var(--maple-primary)] hover:text-[var(--maple-dark)] transition-colors duration-300">
                  Termos de Serviço
                </a>
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
