import { NavLink } from "react-router-dom"
import { LayoutDashboard, List, CheckSquare, FileText, DollarSign, Target, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Sidebar() {
  const menuItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/checklists", icon: CheckSquare, label: "Checklists" },
    { href: "/dashboard/documents", icon: FileText, label: "Documentação" },
    { href: "/dashboard/finances", icon: DollarSign, label: "Finanças" },
    { href: "/dashboard/goals", icon: Target, label: "Metas" },
  ]

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#dc143c] to-[#8b4513] flex items-center justify-center">
            <span className="text-white font-bold text-sm">🍁</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sidebar-foreground">MaplePlan</span>
            <span className="text-xs text-sidebar-accent-foreground">Canada</span>
          </div>
        </div>
      </div>

      {/* Navigation menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink key={item.href} to={item.href} end={item.href === "/dashboard"} className="w-full">
              {({ isActive }) => (
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive && "bg-sidebar-primary text-sidebar-primary-foreground",
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Button>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* Logout button */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground"
        >
          <LogOut className="w-5 h-5" />
          Sair
        </Button>
      </div>
    </aside>
  )
}