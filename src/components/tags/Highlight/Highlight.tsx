import { type FC } from 'react'
import { IconArrowDownRight, IconArrowUpRight } from '@tabler/icons-react'
import classNames from './Highlight.module.pcss'
import { Tag } from '../Tag/Tag'

interface HighlightProps {
	size: 'sm' | 'md' | 'lg'
	title: string
	value: string
	valueSecondary?: string | undefined
	tag: string
}

export const Highlight: FC<HighlightProps> = ({ title, value, valueSecondary, tag, size = 'md' }) => {
	const tagColor = tag?.split('')[0] === '-' ? 'red' : 'green'
	const tagArrow = tag?.split('')[0] === '-' ? <IconArrowDownRight size={18} /> : <IconArrowUpRight size={18} />
	return (
		<div className={`card ${classNames.container}`}>
			<div className={classNames.topRow}>
				{title ? <h5 className="cardHeaderTitle">{title}</h5> : null}
				{valueSecondary ? <Tag color={tagColor} leftIcon={tagArrow} size={size} title={`${tag}%`} /> : null}
			</div>
			<div className={classNames.bottomRow}>
				<h2>{value}</h2>
				{valueSecondary ? (
					<div className={classNames.secondary}>{valueSecondary}</div>
				) : tag ? (
					<div className={classNames.tag}>
						<Tag color={tagColor} leftIcon={tagArrow} size={size} title={`${tag}%`} />
					</div>
				) : null}
			</div>
		</div>
	)
}
