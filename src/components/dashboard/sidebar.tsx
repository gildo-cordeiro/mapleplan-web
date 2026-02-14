import { NavLink, useNavigate } from "react-router-dom"
import { LayoutDashboard, CheckSquare, FileText, DollarSign, Target, LogOut, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/app/context/AuthContext"

export default function Sidebar() {
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    if (isAuthenticated) {
      logout()
    }
    navigate('/login')
  }

  const menuItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/checklists", icon: CheckSquare, label: "Checklists" },
    { href: "/dashboard/documents", icon: FileText, label: "Documentação" },
    { href: "/dashboard/finances", icon: DollarSign, label: "Finanças" },
    { href: "/dashboard/goals", icon: Target, label: "Metas" },
  ]

  return (
    <aside className="w-64 bg-gradient-to-b from-[var(--sidebar-bg-1)] via-[var(--sidebar-bg-2)] to-[var(--sidebar-bg-3)] border-r border-border flex flex-col h-screen shadow-xl">
      {/* Logo Section */}
      <div className="p-6 border-b border-border bg-sidebar/60">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--maple-primary)] to-[var(--maple-primary)]/70 flex items-center justify-center shadow-lg shadow-[var(--maple-primary)]/30 transform hover:scale-110 transition-transform duration-300">
            <span className="text-white font-bold text-xl">🍁</span>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg text-foreground">MaplePlan</span>
            <span className="text-xs text-muted-foreground font-semibold tracking-wider">CANADA</span>
          </div>
        </div>
      </div>

      {/* Navigation menu */}
      <nav className="flex-1 p-4 space-y-1.5">
        <p className="text-xs font-bold text-muted-foreground tracking-widest px-3 py-2 uppercase">Navegação</p>
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink key={item.href} to={item.href} end={item.href === "/dashboard"} className="w-full">
              {({ isActive }) => (
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-between gap-3 text-foreground h-10 px-3 relative overflow-hidden rounded-lg transition-all duration-300",
                    isActive 
                      ? "bg-gradient-to-r from-[var(--maple-primary)]/20 to-[var(--maple-primary)]/5 dark:from-[var(--maple-primary)]/30 dark:to-[var(--maple-primary)]/10 text-[var(--maple-primary)] font-bold shadow-md shadow-[var(--maple-primary)]/20 dark:shadow-[var(--maple-primary)]/30" 
                      : "hover:bg-gradient-to-r hover:from-slate-100/60 hover:to-slate-50/60 dark:hover:from-slate-700/40 dark:hover:to-slate-700/20 hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--maple-primary)] to-[var(--maple-primary)]/50 rounded-r-full" />
                    )}
                    <Icon className={cn("w-5 h-5 transition-all duration-300", isActive && "scale-110")} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4" />}
                </Button>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* Logout button */}
      <div className="p-4 border-t border-border bg-sidebar/60">
        <Button
          className="w-full justify-start gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 dark:from-red-700 dark:to-red-800 dark:hover:from-red-800 dark:hover:to-red-900 text-white shadow-lg shadow-red-500/20 dark:shadow-red-900/40 hover:shadow-xl transition-all duration-300 rounded-lg font-semibold h-10"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          Sair
        </Button>
      </div>
    </aside>
  )
}