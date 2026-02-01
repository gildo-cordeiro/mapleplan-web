
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import LoginLayout from '@/components/login/LoginLayout'
import LoginForm from '@/components/login/LoginForm'
import OnboardingModal from '@/components/OnboardingModal'

export default function LoginPage() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [userEmail, setUserEmail] = useState("")

  const handleAccountCreated = (email: string) => {
    setUserEmail(email)
    setShowOnboarding(true)
  }

  const navigate = useNavigate()

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    // Navigate to dashboard or next page
    navigate("/dashboard")
  }

  return (
    <LoginLayout>
      <LoginForm onAccountCreated={handleAccountCreated} />
      {showOnboarding && <OnboardingModal email={userEmail} onComplete={handleOnboardingComplete} />}
    </LoginLayout>
  )
}
