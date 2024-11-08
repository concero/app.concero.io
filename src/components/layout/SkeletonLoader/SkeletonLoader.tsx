import classNames from './SkeletonLoader.module.pcss'

interface SkeletonLoaderProps {
	className?: string
	width?: number
	height: number
}

export function SkeletonLoader({ className, width, height }: SkeletonLoaderProps) {
	return (
		<div
			style={{
				width,
				height,
			}}
			className={`${classNames.line} ${className}`}
		/>
	)
}
