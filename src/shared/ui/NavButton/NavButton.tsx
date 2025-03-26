import { Button, Tag, TButtonProps } from '@concero/ui-kit'
import cls from './NavButton.module.pcss'
import clsx from 'clsx'
type TProps = {
	active?: boolean
	isDisabled?: boolean
	newFlag?: boolean
	text?: string
	className?: string
	buttonProps?: Omit<TButtonProps, 'className'>
}

export const NavButton = (props: TProps) => {
	const { active, className, newFlag, buttonProps, text, isDisabled } = props

	return (
		<Button
			isDisabled={isDisabled}
			className={clsx({ [cls.active]: active }, className)}
			rightIcon={
				isDisabled ? (
					<Tag size="s" variant="neutral">
						Coming Soon
					</Tag>
				) : newFlag ? (
					<Tag size="s" variant="branded">
						New!
					</Tag>
				) : null
			}
			variant="tetrary"
			{...buttonProps}
		>
			{text}
		</Button>
	)
}
