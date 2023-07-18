import { Route, Step } from '../../../api/lifi/types'

export interface SwapCardProps {}

export interface SwapDetailsProps {
  selection: {
    from: Selection
    to: Selection
  }
  selectedRoute: Route
  setSelectedRoute: (route: Route) => void
  routes: Route[]
}

export interface Selection {
  chain: Chain
  token: Token
}

export interface Token {
  name: string
  symbol: string
}

export interface Chain {
  name: string
  symbol: string
}

export interface RouteButtonProps {
  route: Route
  onClick: () => void
}

export interface AvatarsProps {
  entities: Step[]
}
