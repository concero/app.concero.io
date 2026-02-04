import clsx from 'clsx'
import cls from './Alert.module.pcss'
import { ReactNode } from 'react'

export type TAlertType = 'neutral' | 'warning' | 'negative' | 'positive' | 'branded'
export type TAlertProps = {
	type: TAlertType
	title?: string
	description?: string
	icon?: ReactNode
	className?: string
	htmlDivProps?: Omit<React.ComponentProps<'div'>, 'className'>
}
type TClassname = string
export const Alert = (props: TAlertProps) => {
	const { type = 'branded', title, description, icon, className, htmlDivProps } = props
	const onlyTitle = Boolean(title) && Boolean(description) === false
	const typeMap: Record<TAlertType, TClassname> = {
		branded: cls.branded,
		negative: cls.negative,
		neutral: cls.neutral,
		positive: cls.positive,
		warning: cls.warning,
	}
	return (
		<div className={clsx(cls.alert_body_wrap, typeMap[type], className)} {...htmlDivProps}>
			<div>
				<AlertIcon type={type} icon={icon ?? null} />
			</div>
			<div className={clsx(cls.alert_body, { [cls.only_title]: onlyTitle })}>
				<span className={cls.title} title={title}>
					{title}
				</span>
				{Boolean(description) && <span className={cls.description}>{description}</span>}
			</div>
		</div>
	)
}

export const AlertIcon = (props: Pick<TAlertProps, 'type' | 'icon' | 'className'>) => {
	const { type = 'branded', icon, className } = props

	const typeMap: Record<TAlertType, TClassname> = {
		branded: cls.branded,
		negative: cls.negative,
		neutral: cls.neutral,
		positive: cls.positive,
		warning: cls.warning,
	}
	return <div className={clsx(cls.icon_wrap, typeMap[type], className)}>{icon}</div>
}
