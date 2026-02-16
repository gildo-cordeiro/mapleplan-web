import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/app/context/ThemeContext"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
      aria-label="Alternar tema"
    >
      {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-700" />}
    </button>
  )
}