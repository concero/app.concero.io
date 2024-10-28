import { SkeletonLoader } from '../../../../layout/SkeletonLoader/SkeletonLoader'
import classNames from './AmountInputSkeleton.module.pcss'

export function AmountInputSkeleton() {
	return (
		<div className={classNames.container}>
			<SkeletonLoader className={classNames.amount} />
			<SkeletonLoader className={classNames.amountUsd} />
		</div>
	)
}
