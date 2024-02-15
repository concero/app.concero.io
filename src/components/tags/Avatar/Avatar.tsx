import { type FC } from 'react'
import classNames from './Avatar.module.pcss'

interface AvatarProps {
	size?: 'sm' | 'md' | 'lg' | 'xs'
	src: string
	className?: string
}

const getClasses = (size: AvatarProps['size'], className: AvatarProps['className']) => {
	const baseClasses = [classNames.container]
	const sizeClass = size ? classNames[size] : ''
	const additionalClasses = className?.split(' ')

	return baseClasses.concat(sizeClass, additionalClasses).join(' ')
}

export const Avatar: FC<AvatarProps> = ({ size, src, className }) => (
	<div className={getClasses(size, className)}>
		<img
			src={src || ''}
			className={`${classNames.avatar} ${src ? '' : 'grey-circle'}`}
			onError={e => {
				e.target.src =
					'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="gray"%3E%3Crect width="100%" height="100%"%3E%3C/rect%3E%3C/svg%3E'
			}}
		/>
	</div>
)
