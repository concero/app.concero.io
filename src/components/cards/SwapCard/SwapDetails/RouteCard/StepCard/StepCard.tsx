import { type Step } from '../../../../../../types/StandardRoute'

interface StepCardProps {}

interface StepCardProps {
	steps: Step[] | null
	isCollapsed: boolean
}

export function StepCard({ steps, isCollapsed }: StepCardProps) {
	return <div></div>
}
