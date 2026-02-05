import type React from "react"
import MapleIcon from '@/components/ui/MapleIcon'
import ProvincesCarousel from '@/components/login/ProvincesCarousel'

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Image/Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 flex-col justify-between p-8">
        {/* Background Pattern with Maple Leaves */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            {[...Array(12)].map((_, i) => (
              <text key={i} x={Math.random() * 400} y={Math.random() * 400} fontSize="60" opacity={Math.random() * 0.3}>
                🍁
              </text>
            ))}
          </svg>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/80 to-red-900/80"></div>

        {/* Content */}
        <div className="relative z-10">
          <div className="mb-16">
            <MapleIcon />
          </div>
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight text-balance">
            Sua jornada organizada para o Canadá
          </h1>
          <p className="text-amber-50 text-lg opacity-90">
            Planeje sua imigração com confiança e segurança ao lado do seu parceiro
          </p>
          <ProvincesCarousel />
        </div>

        {/* Decorative Element */}
        <div className="relative z-10">
          <div className="w-24 h-24 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  )
}
