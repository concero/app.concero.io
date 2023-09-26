import { FC } from 'react'
import classNames from './InfoCard.module.pcss'
import { Tag } from '../../../tags/Tag/Tag'

interface InfoCardProps {
	title: string
	value: string
	tagValue?: string
	secondaryValue?: string
}

export const InfoCard: FC<InfoCardProps> = ({ title, value, tagValue, secondaryValue }) => {
	return (
		<div className={`card ${classNames.container}`}>
			<div className={classNames.titleContainer}>
				<h5>{title}</h5>
			</div>
			<div className={classNames.infoContainer}>
				<h3>{value}</h3>
				{secondaryValue ? (
					<h4>{secondaryValue}</h4>
				) : tagValue ? (
					<Tag color="main" size="sm">
						<h5 className={classNames.tagText}>{tagValue}</h5>
					</Tag>
				) : null}
			</div>
		</div>
	)
}
