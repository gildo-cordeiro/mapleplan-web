import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function applyTheme(theme: Theme) {
  const isDark = theme === "dark"
  const root = document.getElementById("root")

  document.documentElement.classList.toggle("dark", isDark)
  document.body.classList.toggle("dark", isDark)
  root?.classList.toggle("dark", isDark)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme")
    const initialTheme: Theme = savedTheme === "dark" ? "dark" : "light"
    setTheme(initialTheme)
  }, [])

  useEffect(() => {
    if (!mounted) {
      return
    }

    localStorage.setItem("theme", theme)
    applyTheme(theme)
  }, [mounted, theme])

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"))
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }

  return context
}
