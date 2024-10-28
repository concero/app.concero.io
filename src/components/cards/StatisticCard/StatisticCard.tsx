import { Card } from '../Card/Card'
import classNames from './StatisticCard.module.pcss'
import { SkeletonLoader } from '../../layout/SkeletonLoader/SkeletonLoader'

interface Props {
	title: string
	value: number
	isLoading?: boolean
}

export const StatisticCard = ({ title, value, isLoading }: Props) => {
	return (
		<Card className="cardConvex w-full">
			<div className="gap-sm">
				<h4>{title}</h4>
				{isLoading ? <SkeletonLoader width={128} height={24} /> : <h3 className={classNames.value}>{value}</h3>}
			</div>
		</Card>
	)
}
