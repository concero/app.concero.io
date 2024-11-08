import classNames from './ReviewRouteCard.module.pcss'

interface ReviewRouteCardProps {
	selectedRoute: any
}

export function ReviewRouteCard({ selectedRoute }: ReviewRouteCardProps) {
	if (!selectedRoute) return

	return (
		<div className={classNames.container}>
			<div className="gap-md">Toggle</div>
		</div>
	)
}
