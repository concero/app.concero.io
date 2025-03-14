import { type ReactNode } from 'react'
import { InfoIcon } from '../../../assets/icons/InfoIcon'
import classNames from './Alert.module.pcss'

type Variant = 'neutral' | 'info' | 'success' | 'error' | 'warning'

interface Props {
	icon?: ReactNode
	title: string
	subtitle?: string
	variant?: Variant
}

const svgColorMap: Record<Variant, string> = {
	neutral: 'var(--color-grey-700)',
	info: 'var(--color-primary-700)',
	success: 'var(--color-success-700)',
	error: 'var(--color-danger-700)',
	warning: 'var(--color-warning-700)',
}
/**@deprecated use from '@concero/ui-kit' */
export const Alert = ({ icon, title, subtitle, variant = 'info' }: Props) => {
	return (
		<div className={`${classNames.container} ${classNames[variant]}`}>
			<div className={classNames.wrapIcon}>{icon || <InfoIcon color={svgColorMap[variant]} />}</div>
			<div className={`${classNames.content}`}>
				<h5>{title}</h5>
				{subtitle && <p className="body4">{subtitle}</p>}
			</div>
		</div>
	)
}
