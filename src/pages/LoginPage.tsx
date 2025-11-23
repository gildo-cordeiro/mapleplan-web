import { AuthBenefits } from "../components/Layout/AuthBenefits"
import { Card } from "@/components/ui/card"
import { LoginForm } from "../features/Auth/components/LoginForm"

export default function LoginPage() {
  const handleLoginSuccess = (email: string) => {
    console.log("[v0] User logged in:", email)
    // Navigate to dashboard or home page
    // router.push("/dashboard")
  }

  const handleNavigateToSignUp = () => {
    console.log("[v0] Navigate to sign up")
    // router.push("/signup")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Brand & Benefits */}
        <AuthBenefits />

        {/* Right Side - Login Form */}
        <div className="w-full">
          <Card className="border border-border shadow-lg">
            <div className="p-8 md:p-10">
              <div className="space-y-2 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Welcome Back</h2>
                <p className="text-muted-foreground">Sign in to continue your immigration planning</p>
              </div>

              <LoginForm onLoginSuccess={handleLoginSuccess} onNavigateToSignUp={handleNavigateToSignUp} />

              {/* Footer Text */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  By signing in, you agree to our{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
