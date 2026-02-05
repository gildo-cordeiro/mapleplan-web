import { useAuth } from "@/app/context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"
import { LoadingScreen } from "./login/LoadingScreen"

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()
  
  if (isLoading) return <LoadingScreen />
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}