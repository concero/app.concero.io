import classNames from './ProfilePlaceholder.module.pcss'
import { SkeletonLoader } from '../../../layout/SkeletonLoader/SkeletonLoader'
import { Card } from '../../../cards/Card/Card'
import { Button } from '../../../buttons/Button/Button'

export const ProfilePlaceholder = () => {
	return (
		<Card className={classNames.container}>
			<SkeletonLoader height={48} width={256} />
			<Button size="sm" variant="secondary">
				Open History
			</Button>
		</Card>
	)
}
