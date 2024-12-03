import { Card } from '../../../../cards/Card/Card'
import classNames from './StreakPlaceholder.module.pcss'
import { type ReactNode } from 'react'
import { SkeletonLoader } from '../../../../layout/SkeletonLoader/SkeletonLoader'
import { Button } from '../../../../buttons/Button/Button'

const Separator = () => {
	return <span className={classNames.separator} />
}

export const Progressbar = () => {
	return (
		<div className="row">
			<div className="gap-sm">
				<p className={classNames.date}>1st Week</p>
				<div className="row gap-sm">
					<SkeletonLoader width={49} height={38} />
				</div>
			</div>
			<Separator />
			<div className="gap-sm">
				<p className={classNames.date}>Months</p>
				<div className="row gap-xs">
					<SkeletonLoader width={45.7} height={38} />
					<SkeletonLoader width={45.7} height={38} />
					<SkeletonLoader width={45.7} height={38} />
					<SkeletonLoader width={45.7} height={38} />
				</div>
			</div>
		</div>
	)
}

interface Props {
	button: ReactNode
}

const StreakPlaceholder = ({ button }: Props) => {
	return (
		<Card className={classNames.container}>
			<div className="row jsb ac">
				<SkeletonLoader height={22} width={128} />
			</div>
			<div className="row gap-sm">
				<Progressbar />
			</div>
			{button}
		</Card>
	)
}

export const StreaksPlaceholders = () => {
	return (
		<div className="row wrap gap-lg">
			<StreakPlaceholder
				button={
					<Button size="sm" variant="secondary">
						Provide Liquidity
					</Button>
				}
			/>
			<StreakPlaceholder
				button={
					<Button size="sm" variant="secondary">
						Swap
					</Button>
				}
			/>
		</div>
	)
}
