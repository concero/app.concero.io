import { RouteStepTag } from './RouteStepTag'

interface Route {
  id: string
  route_steps: Step[]
  transaction_time_seconds: string
  gas_price_usd: string
  slippage_percent: string
  from: {
    token: {
      name: string
      symbol: string
    }
    chain: {
      name: string
      symbol: string
    }
  }
}

interface Step {
  id: string
  transaction_time_seconds: string
  gas_price_usd: string
  slippage_percent: string
  from: {
    token: {
      name: string
      symbol: string
    }
    chain: {
      name: string
      symbol: string
    }
  }
}

export const renderSteps = (route: Route, isRoutesCollapsed: boolean, isSelected: boolean) => (
  <>
    {isRoutesCollapsed ? (
      <RouteStepTag
        step={route.route_steps[0]}
        isRoutesCollapsed={isRoutesCollapsed}
        length={route.route_steps.length}
        isSelected={isSelected}
      />
    ) : (
      route.route_steps.map((step) => (
        <RouteStepTag
          key={step.id}
          step={step}
          isRoutesCollapsed={isRoutesCollapsed}
          isSelected={isSelected}
        />
      ))
    )}
  </>
)
