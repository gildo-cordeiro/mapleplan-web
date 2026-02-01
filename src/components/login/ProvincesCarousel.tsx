import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"

interface ProvinceImage {
	name: string
	image: string
}

interface ProvincesCarouselProps {
	intervalMs?: number
}

export default function ProvincesCarousel({ intervalMs = 3500 }: ProvincesCarouselProps) {
	const items = useMemo<ProvinceImage[]>(
		() => [
			{ name: "Alberta", image: "/provinces/alberta.jpg" },
			{ name: "British Columbia", image: "/provinces/british-columbia.jpg" },
			{ name: "Manitoba", image: "/provinces/manitoba.jpg" },
			{ name: "New Brunswick", image: "/provinces/new-brunswick.jpg" },
			{ name: "Newfoundland and Labrador", image: "/provinces/newfoundland-and-labrador.jpg" },
			{ name: "Nova Scotia", image: "/provinces/nova-scotia.jpg" },
			{ name: "Ontario", image: "/provinces/ontario.jpg" },
			{ name: "Prince Edward Island", image: "/provinces/prince-edward-island.jpg" },
			{ name: "Quebec", image: "/provinces/quebec.jpg" },
			{ name: "Saskatchewan", image: "/provinces/saskatchewan.jpg" },
		],
		[]
	)

	const [activeIndex, setActiveIndex] = useState(0)
	const [isPaused, setIsPaused] = useState(false)

	useEffect(() => {
		if (isPaused) return
		const id = window.setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % items.length)
		}, intervalMs)
		return () => window.clearInterval(id)
	}, [intervalMs, isPaused, items.length])

	const activeItem = items[activeIndex]

	return (
		<Card
			className="mt-10 overflow-hidden border-white/10 bg-white/5 backdrop-blur-sm"
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
		>
			<div className="relative">
				<img
					src={activeItem.image}
					alt={`Paisagem de ${activeItem.name}`}
					className="w-full aspect-video object-cover"
					loading="lazy"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
				<div className="absolute bottom-3 left-4">
					<p className="text-sm font-semibold text-white">{activeItem.name}</p>
					<p className="text-xs text-amber-100/80">Províncias do Canadá</p>
				</div>
			</div>

			<div className="flex items-center justify-between gap-2 px-4 py-3">
				<div className="flex gap-2">
					{items.map((item, index) => (
						<button
							key={item.name}
							type="button"
							className={`h-2.5 w-2.5 rounded-full transition ${
								index === activeIndex ? "bg-amber-300" : "bg-white/40 hover:bg-white/70"
							}`}
							aria-label={`Mostrar ${item.name}`}
							onClick={() => setActiveIndex(index)}
						/>
					))}
				</div>

				<div className="flex gap-2">
					<Button
						type="button"
						variant="ghost"
						size="sm"
						className="h-8 px-3 text-xs text-white hover:bg-white/10"
						onClick={() => setActiveIndex((prev) => (prev - 1 + items.length) % items.length)}
					>
						Anterior
					</Button>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						className="h-8 px-3 text-xs text-white hover:bg-white/10"
						onClick={() => setActiveIndex((prev) => (prev + 1) % items.length)}
					>
						Próxima
					</Button>
				</div>
			</div>
		</Card>
	)
}