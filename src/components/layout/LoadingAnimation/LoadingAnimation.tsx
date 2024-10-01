import { Ring } from '@uiball/loaders'

export function LoadingAnimation({ color = 'var(--color-primary-to-lightest)', size = 18 }) {
	return <Ring color={color} size={size} />
}
