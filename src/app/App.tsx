import AppRouter from "@/app/router/Router"
import { ThemeProvider } from "@/app/context/ThemeContext"

function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  )
}

export default App
