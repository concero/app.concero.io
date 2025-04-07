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
	max: number
	
}

export const Stepper = () => {}
