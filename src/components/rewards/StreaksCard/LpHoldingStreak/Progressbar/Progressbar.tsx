import { Tag } from '../../../../tags/Tag/Tag'

const ProgressbarStep = () => {
	return <div>step</div>
}

const ProgressbarItem = () => {
	return (
		<div className="gap-xs">
			<Tag size="sm" variant="branded">
				1.5x
			</Tag>
			<ProgressbarStep />
		</div>
	)
}

export const Progressbar = () => {
	return (
		<div className="gap-sm">
			<p>1st Week</p>
			<div>
				<ProgressbarItem />
			</div>
		</div>
	)
}
