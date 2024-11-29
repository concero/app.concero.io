import classNames from './ProfilePlaceholder.module.pcss'
import { SkeletonLoader } from '../../../layout/SkeletonLoader/SkeletonLoader'
import { Card } from '../../../cards/Card/Card'

export const ProfilePlaceholder = () => {
	return (
		<Card className={classNames.container}>
			<SkeletonLoader height={48} width={256} />
			<SkeletonLoader height={32} width={118} />
		</Card>
	)
}
