import { useAuth } from "@/app/context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"
import { LoadingScreen } from "./login/LoadingScreen"

export function ProtectedRoute() {
  const { token, isLoading } = useAuth()
  
  if (isLoading) return <LoadingScreen />
  
  return token ? <Outlet /> : <Navigate to="/login" />
}