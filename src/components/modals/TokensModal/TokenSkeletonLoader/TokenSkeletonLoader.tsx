import classNames from './TokenSkeletonLoader.module.pcss'
import { SkeletonLoader } from '../../../layout/SkeletonLoader/SkeletonLoader'

interface TokenSkeletonLoaderProps {
	count?: number
}

export function TokenSkeletonLoader({ count = 1 }: TokenSkeletonLoaderProps) {
	return (
		<div className={classNames.container}>
			{Array.from({ length: count }).map((_, i) => (
				<div key={i.toString()} className={classNames.item}>
					<div className={classNames.infoContainer}>
						<SkeletonLoader className={classNames.iconSkeleton} />
						<div className={classNames.titleContainer}>
							<SkeletonLoader className={classNames.titleSkeleton} />
							<SkeletonLoader className={classNames.subtitleSkeleton} />
						</div>
					</div>
					<div>
						<SkeletonLoader className={classNames.balanceSkeleton} />
					</div>
				</div>
			))}
		</div>
	)
}
