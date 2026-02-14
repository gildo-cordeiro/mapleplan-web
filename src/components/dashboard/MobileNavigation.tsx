import { NavLink } from "react-router-dom"
import { LayoutDashboard, List, CheckSquare, FileText, DollarSign, Target } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MobileNavigation() {
  
  const menuItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/checklists", icon: CheckSquare, label: "Checklists" },
    { href: "/dashboard/documents", icon: FileText, label: "Docs" },
    { href: "/dashboard/finances", icon: DollarSign, label: "Finanças" },
    { href: "/dashboard/goals", icon: Target, label: "Metas" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--surface-1)] to-[var(--surface-2)] border-t border-border backdrop-blur-sm flex justify-around items-center h-20 md:hidden shadow-2xl shadow-black/10">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/dashboard"}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center w-full h-full gap-1 text-xs font-medium transition-all duration-300",
                  isActive 
                    ? "text-[var(--maple-primary)] bg-gradient-to-t from-[var(--maple-primary)]/10 to-transparent" 
                    : "text-muted-foreground hover:text-foreground",
                )
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
    </nav>
  )
}
