import { Loader2 } from "lucide-react"

export function LoadingScreen() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Carregando...</p>
            </div>
        </div>
    )
}