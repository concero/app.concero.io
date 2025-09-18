import cls from './Text.module.pcss'

type FontVariant =
	| 'body_small'
	| 'body_medium'
	| 'body_large'
	| 'body_xlarge'
	| 'button_medium'
	| 'button_large'
	| 'button_xlarge'
	| 'heading_small'
	| 'heading_medium'
	| 'heading_large'
	| 'heading_xlarge'
	| 'heading_xxlarge'
	| 'heading_xxxlarge'
	| 'heading_xxxxlarge'
interface TextProps {
	variant: FontVariant
	ellipsis?: boolean
	className?: string
	children: React.ReactNode
}

export const Text = ({ variant, children, className, ellipsis }: TextProps) => {
	return <span className={`${cls[variant]} ${ellipsis ? cls.ellipsis : ''} ${className}`}>{children}</span>
}
