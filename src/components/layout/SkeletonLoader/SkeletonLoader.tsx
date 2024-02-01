import classNames from './SkeletonLoader.module.pcss'

interface SkeletonLoaderProps {
	className?: string
}

export function SkeletonLoader({ className }: SkeletonLoaderProps) {
	return <div className={`${classNames.line} ${className}`} />
}
