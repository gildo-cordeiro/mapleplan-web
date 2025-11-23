import type React from "react"
import { useState } from "react"
import { Lock, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useLogin } from "../hooks/useLogin"
import type { LoginCredentials } from "../types"

interface LoginFormProps {
  onLoginSuccess?: (email: string) => void
  onNavigateToSignUp?: () => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess, onNavigateToSignUp }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const { isLoading, error, login } = useLogin()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const credentials: LoginCredentials = {
      email,
      password,
      rememberMe,
    }

    try {
      const response = await login(credentials)
      onLoginSuccess?.(response.user.email)
    } catch (err) {
      console.error("[v0] Login error:", err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className="pl-10 h-11 bg-input border border-border text-foreground placeholder:text-muted-foreground"
            disabled={isLoading}
            required
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-foreground">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            className="pl-10 h-11 bg-input border border-border text-foreground placeholder:text-muted-foreground"
            disabled={isLoading}
            required
          />
        </div>
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked: boolean) => setRememberMe(Boolean(checked))}
            className="border-border"
            disabled={isLoading}
          />
          <label
            htmlFor="remember"
            className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
          >
            Remember me
          </label>
        </div>
        <a href="#" className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
          Forgot password?
        </a>
      </div>

      {/* Login Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base transition-all duration-200"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin">⟳</span>
            Signing in...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Sign In
            <ArrowRight className="w-4 h-4" />
          </span>
        )}
      </Button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-card text-muted-foreground">New to Maple Plan?</span>
        </div>
      </div>

      {/* Sign Up Button */}
      <Button
        type="button"
        onClick={onNavigateToSignUp}
        variant="outline"
        className="w-full h-11 border-border text-foreground hover:bg-muted font-semibold text-base transition-all duration-200 bg-transparent"
      >
        Create Account
      </Button>
    </form>
  )
}
