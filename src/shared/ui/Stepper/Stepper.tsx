import clsx from 'clsx'
import cls from './Stepper.module.pcss'

type TStepVariant = 'default' | 'complited' | 'current_active' | 'warning' | 'danger'
type TStepItemProps = {
	variant?: TStepVariant
}

const StepItem = ({ variant = 'default' }: TStepItemProps) => {
	const variantMap: Record<TStepVariant, string> = {
		complited: cls.complited,
		current_active: cls.current_active,
		danger: cls.danger,
		default: cls.default,
		warning: cls.warning,
	}
	return <div className={clsx(cls.step_item, variantMap[variant])}></div>
}

type TProps = {
	currentProgress: number
	max?: number
	isDanger?: boolean
}

export const Stepper = ({ currentProgress, isDanger, max = 28 }: TProps) => {
	const rows = Math.ceil(max / 7)

	return (
		<div className={cls.stepper_grid}>
			{Array.from({ length: rows }).map((_, rowIndex) => (
				<div key={rowIndex} className={cls.stepper_row}>
					{Array.from({ length: 7 }).map((_, cellIndex) => {
						const index = rowIndex * 7 + cellIndex + 1
						if (index > max) return null
						let variant: TStepVariant = 'default'
						if (index < currentProgress) {
							variant = 'complited'
						} else if (index === currentProgress) {
							if (isDanger) {
								variant = 'danger'
							} else {
								variant = 'current_active'
							}
						}

						return <StepItem key={cellIndex} variant={variant} />
					})}
				</div>
			))}
		</div>
	)
}
