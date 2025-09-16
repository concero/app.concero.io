import clsx from 'clsx'
import cls from './Stepper.module.pcss'

type TStepVariant = 'default' | 'complited' | 'current_active' | 'warning' | 'danger' | 'success'

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
		success: cls.success,
	}
	return <div className={clsx(cls.step_item, variantMap[variant])}></div>
}

type TProps = {
	currentProgress: number
	max?: number
	warningCells?: number[]
	dangerCells?: number[]
	successCells?: number[]
	activeCells?: number[]
	maxColumns?: number

	className?: string
}

export const Stepper = (props: TProps) => {
	const {
		currentProgress,
		max = 30,
		warningCells = [],
		dangerCells = [],
		successCells = [],
		activeCells = [],
		maxColumns = 7,
		className,
	} = props
	const rows = Math.ceil(max / 7)

	return (
		<div className={clsx(cls.stepper_grid, className)}>
			{Array.from({ length: rows }).map((_, rowIndex) => (
				<div
					key={rowIndex}
					className={cls.stepper_row}
					style={{ gridTemplateColumns: `repeat(${maxColumns}, 1fr)` }}
				>
					{Array.from({ length: 7 }).map((_, cellIndex) => {
						const index = rowIndex * 7 + cellIndex + 1
						if (index > max) return null

						let variant: TStepVariant = 'default'

						if (dangerCells.includes(index)) {
							variant = 'danger'
						} else if (warningCells.includes(index)) {
							variant = 'warning'
						} else if (successCells.includes(index)) {
							variant = 'success'
						} else if (activeCells.includes(index)) {
							variant = 'current_active'
						} else if (index < currentProgress) {
							variant = 'complited'
						} else if (index === currentProgress) {
							variant = 'current_active'
						}

						return <StepItem key={cellIndex} variant={variant} />
					})}
				</div>
			))}
		</div>
	)
}
