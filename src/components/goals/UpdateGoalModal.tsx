import { useAuth } from "@/app/context/AuthContext"
import { goalService } from "@/services/goalService"
import { Goal } from "@/types"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/Dialog"
import { GoalsPriority, GoalsPhase, GoalStatus, UpdateFormData } from "@/types/goals"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/Select"
import { Target } from "lucide-react"
import { Label } from "@/components/ui/Label"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Textarea } from "../ui/Textarea"

interface UpdateGoalModalProps {
    goalId: string
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onUpdated?: () => void
}


export function UpdateGoalModal({ goalId, isOpen, onOpenChange, onUpdated }: UpdateGoalModalProps) {
    const { token, user } = useAuth()
    const [goal, setGoal] = useState<Goal | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const [formData, setFormData] = useState<UpdateFormData>({
        title: "",
        description: "",
        dueDate: "",
        status: GoalStatus.NOT_STARTED,
        priority: GoalsPriority.MEDIUM,
        phase: GoalsPhase.PRE_DEPARTURE,
        assignedToUser: null,
        assignedToCouple: null
    })

    const userId = user?.id ?? ""
    const partnerId = user?.partnerId ?? ""
    const coupleId = user?.coupleId ?? ""
    const hasPartner = Boolean(partnerId)
    const userLabel = user?.firstName ? `Eu (${user.firstName})` : "Eu"
    const partnerName = user?.partnerFirstName ?? "Parceiro(a)"
    const partnerLabel = `Parceiro(a) (${partnerName})`

    // Converte data ISO para formato datetime-local (yyyy-MM-ddThh:mm)
    const formatDateForInput = (isoDate: string): string => {
        if (!isoDate) return ""
        try {
            const date = new Date(isoDate)
            if (isNaN(date.getTime())) return ""

            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const day = String(date.getDate()).padStart(2, '0')
            const hours = String(date.getHours()).padStart(2, '0')
            const minutes = String(date.getMinutes()).padStart(2, '0')

            return `${year}-${month}-${day}T${hours}:${minutes}`
        } catch {
            return ""
        }
    }

    useEffect(() => {
        if (!goalId || !token) return

        const fetchGoal = async () => {
            setError(null)
            try {
                const fetchedGoal = await goalService.getGoal(token, goalId)
                setGoal(fetchedGoal)

                // Preencher o formulário com os dados da meta
                setFormData({
                    title: fetchedGoal.title || "",
                    description: fetchedGoal.description || "",
                    status: fetchedGoal.status,
                    dueDate: formatDateForInput(fetchedGoal.dueDate),
                    priority: fetchedGoal.priority || GoalsPriority.MEDIUM,
                    phase: fetchedGoal.phase || GoalsPhase.PRE_DEPARTURE,
                    assignedToUser: fetchedGoal.assignedToUser || null,
                    assignedToCouple: fetchedGoal.assignedToCouple || null
                })
            } catch (err) {
                setError("Erro ao carregar a meta")
            }
        }

        fetchGoal()
    }, [goalId, token, userId])

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        if (!token || !goalId) return

        const isAmboSelected = formData.assignedToCouple === coupleId

        const updateData: UpdateFormData = {
            title: formData.title,
            status: formData.status,
            description: formData.description,
            dueDate: formData.dueDate,
            priority: formData.priority,
            phase: formData.phase,
            assignedToUser:  formData.assignedToUser,
            assignedToCouple: formData.assignedToCouple
        }

        if (!updateData.title || !updateData.phase) {
            setError("Por favor, preencha os campos obrigatórios")
            return
        }

        setSubmitting(true)
        setError(null)

        try {
            await goalService.updateGoal(token, goalId, updateData)
            onUpdated?.()
            onOpenChange(false)
        } catch (submitError) {
            console.error("Erro ao atualizar meta:", submitError)
            setError("Não foi possível atualizar a meta. Tente novamente.")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-800 dark:to-slate-800/50 border-0 shadow-md">
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[var(--maple-primary)]/0 to-[var(--maple-primary)]/0 rounded-lg" />
                <DialogHeader className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-[var(--maple-primary)] to-[var(--maple-primary)]/70 shadow-lg shadow-[var(--maple-primary)]/30">
                            <Target className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <DialogTitle className="text-2xl font-bold">Atualizar Meta</DialogTitle>
                            <DialogDescription className="text-sm">Edite os detalhes da sua meta</DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                    {error ? (
                        <p className="text-sm text-red-600" role="alert">
                            {error}
                        </p>
                    ) : null}
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-sm font-semibold text-foreground">Título da Meta *</Label>
                        <Input
                            id="title"
                            placeholder="Ex: Passar no IELTS"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                            className="border-slate-200 dark:border-slate-700 focus:border-[var(--maple-primary)] transition-all duration-300"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-semibold text-foreground">Descrição</Label>
                        <Textarea
                            id="description"
                            placeholder="Detalhe sua meta..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                            className="border-slate-200 dark:border-slate-700 focus:border-[var(--maple-primary)] transition-all duration-300"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="dueDate" className="text-sm font-semibold text-foreground">Prazo Final</Label>
                            <Input
                                id="dueDate"
                                type="datetime-local"
                                value={formData.dueDate}
                                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                className="border-slate-200 dark:border-slate-700 focus:border-[var(--maple-primary)] transition-all duration-300"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="priority" className="text-sm font-semibold text-foreground">Prioridade</Label>
                            <Select
                                value={formData.priority}
                                onValueChange={(value) => setFormData({ ...formData, priority: value as GoalsPriority })}
                            >
                                <SelectTrigger id="priority">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">Baixa</SelectItem>
                                    <SelectItem value="medium">Média</SelectItem>
                                    <SelectItem value="high">Alta</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="phase" className="text-sm font-semibold text-foreground">Fase *</Label>
                            <Select
                                value={formData.phase}
                                onValueChange={(value) => setFormData({ ...formData, phase: value as GoalsPhase })}
                            >
                                <SelectTrigger id="phase" className="border-slate-200 dark:border-slate-700 focus:border-[var(--maple-primary)] transition-all duration-300">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={GoalsPhase.PRE_DEPARTURE}>Pré-Partida</SelectItem>
                                    <SelectItem value={GoalsPhase.ARRIVAL}>Chegada</SelectItem>
                                    <SelectItem value={GoalsPhase.POST_ARRIVAL}>Adaptação</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="assignedTo" className="text-sm font-semibold text-foreground">Atribuir a *</Label>
                            <Select
                                value={formData.assignedToCouple === coupleId ? coupleId : formData.assignedToUser || ""}
                                onValueChange={(value) => {
                                    if (value === coupleId) {
                                        setFormData({ ...formData, assignedToCouple: coupleId, assignedToUser: null })
                                    } else {
                                        setFormData({ ...formData, assignedToUser: value, assignedToCouple: null })
                                    }
                                }}
                            >
                                <SelectTrigger id="assignedTo" className="border-slate-200 dark:border-slate-700 focus:border-[var(--maple-primary)] transition-all duration-300">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={userId}>{userLabel}</SelectItem>
                                    {hasPartner ? <SelectItem value={partnerId}>{partnerLabel}</SelectItem> : null}
                                    {coupleId ? <SelectItem value={coupleId}>Ambos</SelectItem> : null}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="status" className="text-sm font-semibold text-foreground">Status</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) => setFormData({ ...formData, status: value as GoalStatus })}
                            >
                                <SelectTrigger id="status" className="border-slate-200 dark:border-slate-700 focus:border-[var(--maple-primary)] transition-all duration-300">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={GoalStatus.NOT_STARTED}>Não Iniciada</SelectItem>
                                    <SelectItem value={GoalStatus.IN_PROGRESS}>Em Progresso</SelectItem>
                                    <SelectItem value={GoalStatus.COMPLETED}>Concluída</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 bg-[var(--maple-primary)] hover:bg-[var(--maple-dark)]"
                            disabled={submitting}
                        >
                            {submitting ? "Atualizando..." : "Atualizar Meta"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}