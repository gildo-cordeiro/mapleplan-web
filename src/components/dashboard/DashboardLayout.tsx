import type React from "react"

import { useState } from "react"
import Sidebar from '@/components/dashboard/Sidebar'
import MobileNavigation from '@/components/dashboard/MobileNavigation'
import { useEffect } from "react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className="flex h-screen bg-background">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">{children}</main>

        {isMobile && <MobileNavigation />}
      </div>
    </div>
  )
}

export { DashboardLayout }