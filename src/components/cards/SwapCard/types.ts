import { type StandardRoute, type Step } from '../../../types/StandardRoute'
import { type Chain, type Token } from '../../../api/concero/types'

export interface SwapCardProps {}

export interface SwapDetailsProps {
	swapState: any
	setSelectedRoute: (route: StandardRoute) => void
}

export interface Selection {
	chain: Chain
	token: Token
}

export interface RouteButtonProps {
	selectedRoute: StandardRoute
	onClick: () => void
}

export interface AvatarsProps {
	entities: Step[]
}
