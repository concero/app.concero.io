import { RouteStepTag } from './RouteStepTag'
import { type StandardRoute, type Step } from '../../../types/StandardRoute'

export const renderSteps = (route: StandardRoute, isRoutesCollapsed: boolean, setIsRoutesCollapsed: () => void, isSelected: boolean) => (
	<>
		{isRoutesCollapsed ? (
			<RouteStepTag step={route.steps[0]} isRoutesCollapsed={isRoutesCollapsed} setIsRoutesCollapsed={setIsRoutesCollapsed} length={route.steps.length} isSelected={isSelected} />
		) : (
			route.steps.map((step: Step) => <RouteStepTag key={step.id} step={step} isRoutesCollapsed={isRoutesCollapsed} isSelected={isSelected} />)
		)}
	</>
)
